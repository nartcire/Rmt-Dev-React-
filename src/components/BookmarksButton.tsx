import { useRef, useState } from "react";

import BookmarksPopover from "./BookmarksPopover";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import { useOnClickOutside } from "../lib/hooks";

export default function BookmarksButton() {
  const [isOpen, setIsOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useOnClickOutside([buttonRef, popoverRef], () => setIsOpen(false));

  return (
    <section>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="bookmarks-btn"
      >
        Bookmarks <TriangleDownIcon />
      </button>

      {isOpen ? <BookmarksPopover ref={popoverRef} /> : null}
    </section>
  );
}
