export interface FeedTabsProps {
  activeTab: "feed" | "global" | "tag";
  activeTag?: string;
  showFeedTab: boolean;
  onSelectFeed: () => void;
  onSelectGlobal: () => void;
}

const tabClass = (isActive: boolean) =>
  `inline-block border-b-2 px-4 py-2 text-sm ${
    isActive ? "border-green-600 text-green-600" : "border-transparent text-gray-400"
  }`;

/** Tab strip above the home page article list: "Your Feed" / "Global Feed" / "#tag". */
export function FeedTabs({ activeTab, activeTag, showFeedTab, onSelectFeed, onSelectGlobal }: FeedTabsProps) {
  return (
    <ul className="flex list-none border-b border-gray-200">
      {showFeedTab && (
        <li>
          <button type="button" className={tabClass(activeTab === "feed")} onClick={onSelectFeed}>
            Your Feed
          </button>
        </li>
      )}
      <li>
        <button type="button" className={tabClass(activeTab === "global")} onClick={onSelectGlobal}>
          Global Feed
        </button>
      </li>
      {activeTab === "tag" && activeTag && (
        <li>
          <span className={tabClass(true)}>#{activeTag}</span>
        </li>
      )}
    </ul>
  );
}
