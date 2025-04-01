import { SortBy } from "../lib/types";
import { useJobItemsContext } from "../lib/hooks";

export default function SortingControls() {
  const { handleChangeSortBy: onClick, sortBy } = useJobItemsContext();

  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <SortingButton
        onClick={onClick}
        buttonType="relevant"
        isActive={sortBy === "relevant"}
      />
      <SortingButton
        onClick={onClick}
        buttonType="recent"
        isActive={sortBy === "recent"}
      />
    </section>
  );
}

type SortingButtonProps = {
  buttonType: SortBy;
  onClick: (newSortBy: SortBy) => void;
  isActive: boolean;
};

function SortingButton({ onClick, buttonType, isActive }: SortingButtonProps) {
  return (
    <button
      onClick={() => onClick(buttonType)}
      className={`sorting__button sorting__button--${buttonType} ${
        isActive ? "sorting__button--active" : ""
      }`}
    >
      {buttonType === "relevant" ? "Relevant" : "Recent"}
    </button>
  );
}
