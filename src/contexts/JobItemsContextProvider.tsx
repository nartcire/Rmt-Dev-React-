import { JobItem, PageDirection, SortBy } from "../lib/types";
import { createContext, useCallback, useMemo, useState } from "react";
import { useSearchQuery, useSearchTextContext } from "../lib/hooks";

import { RESULTS_PER_PAGE } from "../lib/constants";

type JobItemsContext = {
  totalNumberOfResults: number;
  handleChangeSortBy: (newSortBy: SortBy) => void;
  sortBy: SortBy;
  isLoading: boolean;
  jobItemsSliced: JobItem[];
  currentPage: number;
  handleChangePage: (direction: PageDirection) => void;
  totalNumberOfPages: number;
};

export const JobItemsContext = createContext<JobItemsContext | null>(null);

export default function JobItemsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { debouncedSearchText } = useSearchTextContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>("relevant");
  const { jobItems, isLoading } = useSearchQuery(debouncedSearchText);

  const jobItemsSorted = useMemo(
    () =>
      [...(jobItems || [])].sort((a, b) => {
        if (sortBy === "relevant") {
          return b.relevanceScore - a.relevanceScore;
        } else if (sortBy === "recent") {
          return a.daysAgo - b.daysAgo;
        } else {
          return 0;
        }
      }),
    [jobItems, sortBy]
  );
  const totalNumberOfResults = jobItems?.length || 0;
  const totalNumberOfPages = totalNumberOfResults / RESULTS_PER_PAGE;
  const jobItemsSliced = useMemo(
    () =>
      jobItemsSorted.slice(
        currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
        currentPage * RESULTS_PER_PAGE
      ),
    [jobItemsSorted, currentPage]
  );

  const handleChangePage = (direction: PageDirection) => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleChangeSortBy = (newSortBy: SortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  };

  const contextObject = useMemo(
    () => ({
      totalNumberOfResults,
      handleChangeSortBy,
      sortBy,
      isLoading,
      jobItemsSliced,
      currentPage,
      handleChangePage,
      totalNumberOfPages,
    }),
    [
      totalNumberOfPages,
      handleChangeSortBy,
      sortBy,
      isLoading,
      jobItemsSliced,
      currentPage,
      handleChangePage,
      totalNumberOfPages,
    ]
  );

  return (
    <JobItemsContext.Provider value={contextObject}>
      {children}
    </JobItemsContext.Provider>
  );
}
