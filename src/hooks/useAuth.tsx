"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getCurrentUser, login as loginRequest, register as registerRequest } from "@/lib/api/users";
import { getToken, setToken } from "@/lib/http";
import { queryKeys } from "@/lib/query-keys";
import type { LoginInput, RegisterInput, User } from "@/types";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (input: LoginInput) => Promise<User>;
  register: (input: RegisterInput) => Promise<User>;
  logout: () => void;
  setUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  // Tracks whether we've checked localStorage for a token yet. Prevents a
  // flash of "logged out" UI while the initial /user request is in flight.
  const [hasToken, setHasToken] = useState<boolean | null>(null);

  useEffect(() => {
    // Reading localStorage must happen after mount to avoid SSR/hydration
    // mismatches, so this one-time sync can't be expressed as derived state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasToken(Boolean(getToken()));
  }, []);

  const { data: user, isLoading: isFetchingUser } = useQuery({
    queryKey: queryKeys.currentUser,
    queryFn: getCurrentUser,
    enabled: hasToken === true,
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: (loggedInUser) => {
      setToken(loggedInUser.token);
      queryClient.setQueryData(queryKeys.currentUser, loggedInUser);
    },
  });

  const registerMutation = useMutation({
    mutationFn: registerRequest,
    onSuccess: (newUser) => {
      setToken(newUser.token);
      queryClient.setQueryData(queryKeys.currentUser, newUser);
    },
  });

  const logout = useCallback(() => {
    setToken(null);
    queryClient.setQueryData(queryKeys.currentUser, null);
    queryClient.clear();
  }, [queryClient]);

  const setUser = useCallback(
    (updated: User) => {
      queryClient.setQueryData(queryKeys.currentUser, updated);
    },
    [queryClient],
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      user: user ?? null,
      isLoading: hasToken === null || (hasToken && isFetchingUser),
      isAuthenticated: Boolean(user),
      login: (input) => loginMutation.mutateAsync(input),
      register: (input) => registerMutation.mutateAsync(input),
      logout,
      setUser,
    }),
    [user, hasToken, isFetchingUser, loginMutation, registerMutation, logout, setUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
