import { JobDetails, JobItem } from "./types";
import { useEffect, useState } from "react";

import { BASE_API_URL } from "./constants";
import { handleError } from "./utils";
import { useQuery } from "@tanstack/react-query";

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

export const useJobItems = (searchText: string) => {
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

export const useActiveId = () => {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      console.log(window.location.hash.slice(1));
      setActiveId(+window.location.hash.slice(1));
    };

    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return activeId;
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
