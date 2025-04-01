import { JobDetails, JobItem } from "./types";
import { useContext, useEffect, useState } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";

import { BASE_API_URL } from "./constants";
import { BookmarksContext } from "../contexts/BookmarksContextProvider";
import { JobItemsContext } from "../contexts/JobItemsContextProvider";
import { SearchTextContext } from "../contexts/SearchTextContextProvider";
import { handleError } from "./utils";

type JobItemsAPIResponse = {
  jobItems: JobItem[];
  public: boolean;
  sorted: boolean;
};

const fetchJobItems = async (
  searchText: string
): Promise<JobItemsAPIResponse> => {
  const res = await fetch(`${BASE_API_URL}?search=${searchText}`);

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.description);
  }

  const data = await res.json();

  return data;
};

export const useSearchQuery = (searchText: string) => {
  const { data, isInitialLoading } = useQuery(
    ["job-items", searchText],
    () => fetchJobItems(searchText),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(searchText),
      onError: handleError,
    }
  );

  console.log(data);
  return { jobItems: data?.jobItems, isLoading: isInitialLoading } as const;
};

export const useJobItems = (ids: number[]) => {
  const results = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["job-item", id],
      queryFn: () => fetchJobItem(id),
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
      onError: handleError,
    })),
  });

  const jobItems = results
    .map((result) => result.data?.jobItem)
    .filter((jobItem) => jobItem !== undefined);

  const isLoading = results.some((result) => result.isLoading);

  return { jobItems, isLoading };
};

type JobItemAPIResponse = {
  public: boolean;
  jobItem: JobDetails;
};

const fetchJobItem = async (id: number): Promise<JobItemAPIResponse> => {
  const response = await fetch(`${BASE_API_URL}/${id}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }

  const data = await response.json();
  return data;
};

export const useJobItem = (id: number | null) => {
  const { data, isInitialLoading } = useQuery(
    ["job-item", id],
    () => (id ? fetchJobItem(id) : null),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
      onError: handleError,
    }
  );

  console.log(data);
  return { jobItem: data?.jobItem, isLoading: isInitialLoading } as const;
};

export const useDebounce = <T>(value: T, delay = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debouncedValue;
};

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [state, setState] = useState<T>(() =>
    JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue))
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, setState] as const;
};

export const useBookmarksContext = () => {
  const context = useContext(BookmarksContext);

  if (!context) {
    throw new Error(
      "useBookmarkIcon must be used within a BookmarksContextProvider"
    );
  }

  return context;
};

export const useOnClickOutside = (
  refs: React.RefObject<HTMLElement>[],
  handler: () => void
) => {
  useEffect(() => {
    const callback = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement &&
        refs.every((ref) => !ref.current?.contains(e.target as Node))
      ) {
        handler();
      }
    };

    window.addEventListener("click", callback);

    return () => window.removeEventListener("click", callback);
  }, [refs, handler]);
};

export const useSearchTextContext = () => {
  const context = useContext(SearchTextContext);

  if (!context) {
    throw new Error("Some error with search text context");
  }

  return context;
};

export const useJobItemsContext = () => {
  const context = useContext(JobItemsContext);

  if (!context) {
    throw new Error("Some error with search job items context");
  }

  return context;
};
