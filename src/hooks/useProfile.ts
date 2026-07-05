import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { followUser, getProfile, unfollowUser } from "@/lib/api/profiles";
import { queryKeys } from "@/lib/query-keys";
import type { Profile } from "@/types";

export function useProfile(username: string) {
  return useQuery({
    queryKey: queryKeys.profile(username),
    queryFn: () => getProfile(username),
  });
}

export function useFollowUser() {
  const queryClient = useQueryClient();

  const updateCache = (profile: Profile) => {
    queryClient.setQueryData(queryKeys.profile(profile.username), profile);
  };

  const follow = useMutation({
    mutationFn: followUser,
    onSuccess: updateCache,
  });

  const unfollow = useMutation({
    mutationFn: unfollowUser,
    onSuccess: updateCache,
  });

  const toggle = (profile: Profile) =>
    profile.following ? unfollow.mutate(profile.username) : follow.mutate(profile.username);

  return {
    toggle,
    isPending: follow.isPending || unfollow.isPending,
  };
}
