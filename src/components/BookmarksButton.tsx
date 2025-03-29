import BookmarksPopover from "./BookmarksPopover";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function BookmarksButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section>
      <button onClick={() => setIsOpen(!isOpen)} className="bookmarks-btn">
        Bookmarks <TriangleDownIcon />
      </button>

      {isOpen ? <BookmarksPopover /> : null}
    </section>
  );
}
