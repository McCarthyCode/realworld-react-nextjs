import { apiFetch } from "@/lib/http";
import type { LoginInput, RegisterInput, UpdateUserInput, User } from "@/types";

interface UserResponse {
  user: User;
}

export function login(input: LoginInput): Promise<User> {
  return apiFetch<UserResponse>("/users/login", {
    method: "POST",
    body: { user: input },
    authenticated: false,
  }).then((res) => res.user);
}

export function register(input: RegisterInput): Promise<User> {
  return apiFetch<UserResponse>("/users", {
    method: "POST",
    body: { user: input },
    authenticated: false,
  }).then((res) => res.user);
}

export function getCurrentUser(): Promise<User> {
  return apiFetch<UserResponse>("/user").then((res) => res.user);
}

export function updateUser(input: UpdateUserInput): Promise<User> {
  return apiFetch<UserResponse>("/user", {
    method: "PUT",
    body: { user: input },
  }).then((res) => res.user);
}
