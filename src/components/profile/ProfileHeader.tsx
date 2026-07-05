import { Avatar } from "@/components/ui/Avatar";
import { FollowButton } from "@/components/ui/FollowButton";
import type { Profile } from "@/types";

export interface ProfileHeaderProps {
  profile: Profile;
  /** Hides the follow button entirely when viewing your own profile. */
  isOwnProfile: boolean;
  onFollowClick: () => void;
  isFollowLoading?: boolean;
}

/** User info banner at the top of a profile page. */
export function ProfileHeader({
  profile,
  isOwnProfile,
  onFollowClick,
  isFollowLoading,
}: ProfileHeaderProps) {
  return (
    <div className="border-b border-gray-100 bg-gray-100 py-8 text-center">
      <Avatar src={profile.image} alt={profile.username} size={100} />
      <h1 className="mt-3 text-2xl font-semibold">{profile.username}</h1>
      {profile.bio && <p className="mt-1 text-gray-500">{profile.bio}</p>}
      {!isOwnProfile && (
        <div className="mt-3 flex justify-center">
          <FollowButton
            username={profile.username}
            following={profile.following}
            onClick={onFollowClick}
            disabled={isFollowLoading}
          />
        </div>
      )}
    </div>
  );
}
