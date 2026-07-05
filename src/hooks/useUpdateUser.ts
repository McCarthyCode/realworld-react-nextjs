import { useMutation } from "@tanstack/react-query";

import { updateUser } from "@/lib/api/users";
import { useAuth } from "@/hooks/useAuth";
import type { UpdateUserInput } from "@/types";

export function useUpdateUser() {
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: (input: UpdateUserInput) => updateUser(input),
    onSuccess: (updated) => {
      setUser(updated);
    },
  });
}
