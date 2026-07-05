"use client";

import { useState } from "react";

import { ArticleList } from "@/components/article/ArticleList";
import { FeedTabs } from "@/components/article/FeedTabs";
import { TagsSidebar } from "@/components/article/TagsSidebar";
import { useAuth } from "@/hooks/useAuth";

type ActiveTab = "feed" | "global" | "tag";

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<ActiveTab>("global");
  const [activeTag, setActiveTag] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);

  const selectTab = (tab: ActiveTab, tag?: string) => {
    setActiveTab(tab);
    setActiveTag(tag);
    setPage(1);
  };

  return (
    <div className="bg-gray-50">
      <div className="border-b border-gray-100 bg-green-700 py-10 text-center text-white">
        <h1 className="font-serif text-5xl font-bold">conduit</h1>
        <p className="mt-1 text-lg font-light">A place to share your knowledge.</p>
      </div>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 py-8 md:grid-cols-[1fr_260px]">
        <div>
          <FeedTabs
            activeTab={activeTab}
            activeTag={activeTag}
            showFeedTab={isAuthenticated}
            onSelectFeed={() => selectTab("feed")}
            onSelectGlobal={() => selectTab("global")}
          />
          <ArticleList
            source={activeTab === "tag" ? "tag" : activeTab}
            value={activeTag}
            page={page}
            onPageChange={setPage}
          />
        </div>
        <TagsSidebar activeTag={activeTag} onTagClick={(tag) => selectTab("tag", tag)} />
      </div>
    </div>
  );
}
