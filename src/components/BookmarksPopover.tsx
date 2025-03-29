import { useBookmarksContext } from "../lib/hooks";

export default function BookmarksPopover() {
  const { bookmarkedJobItems, isLoading } = useBookmarksContext();

  return <div className="bookmarks-popover"></div>;
}
