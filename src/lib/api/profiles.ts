import { apiFetch } from "@/lib/http";
import type { Profile } from "@/types";

interface ProfileResponse {
  profile: Profile;
}

export function getProfile(username: string): Promise<Profile> {
  return apiFetch<ProfileResponse>(`/profiles/${encodeURIComponent(username)}`, {
    authenticated: true,
  }).then((res) => res.profile);
}

export function followUser(username: string): Promise<Profile> {
  return apiFetch<ProfileResponse>(
    `/profiles/${encodeURIComponent(username)}/follow`,
    { method: "POST" },
  ).then((res) => res.profile);
}

export function unfollowUser(username: string): Promise<Profile> {
  return apiFetch<ProfileResponse>(
    `/profiles/${encodeURIComponent(username)}/follow`,
    { method: "DELETE" },
  ).then((res) => res.profile);
}
