"use client";

import { use, useState } from "react";

import { ArticleList } from "@/components/article/ArticleList";
import { ProfileArticleTabs } from "@/components/profile/ProfileArticleTabs";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ErrorMessages } from "@/components/ui/ErrorMessages";
import { Spinner } from "@/components/ui/Spinner";
import { useAuth } from "@/hooks/useAuth";
import { useFollowUser, useProfile } from "@/hooks/useProfile";

export default function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = use(params);
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const { data: profile, isLoading, isError } = useProfile(username);
  const { toggle, isPending } = useFollowUser();

  if (isLoading) {
    return <Spinner label="Loading profile" />;
  }

  if (isError || !profile) {
    return <ErrorMessages errors={["User not found."]} />;
  }

  return (
    <div>
      <ProfileHeader
        profile={profile}
        isOwnProfile={user?.username === profile.username}
        onFollowClick={() => toggle(profile)}
        isFollowLoading={isPending}
      />
      <div className="mx-auto max-w-3xl px-4 py-8">
        <ProfileArticleTabs username={username} activeTab="articles" />
        <ArticleList
          source="author"
          value={username}
          page={page}
          onPageChange={setPage}
          emptyMessage="This user hasn't published any articles yet."
        />
      </div>
    </div>
  );
}
