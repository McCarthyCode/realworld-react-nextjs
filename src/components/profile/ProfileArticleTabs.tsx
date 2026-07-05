import Link from "next/link";

export interface ProfileArticleTabsProps {
  username: string;
  activeTab: "articles" | "favorites";
}

const tabClass = (isActive: boolean) =>
  `inline-block border-b-2 px-4 py-2 text-sm ${
    isActive ? "border-green-600 text-green-600" : "border-transparent text-gray-400"
  }`;

/** "My Articles" / "Favorited Articles" tab strip on a profile page. */
export function ProfileArticleTabs({ username, activeTab }: ProfileArticleTabsProps) {
  return (
    <ul className="flex list-none border-b border-gray-200">
      <li>
        <Link href={`/profile/${username}`} className={tabClass(activeTab === "articles")}>
          My Articles
        </Link>
      </li>
      <li>
        <Link
          href={`/profile/${username}/favorites`}
          className={tabClass(activeTab === "favorites")}
        >
          Favorited Articles
        </Link>
      </li>
    </ul>
  );
}
