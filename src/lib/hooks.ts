import { JobDetails, JobItem } from "./types";
import { useEffect, useState } from "react";

import { BASE_API_URL } from "./constants";
import { useQuery } from "@tanstack/react-query";

export const useJobItems = (searchText: string) => {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const totalNumberOfResults = jobItems.length;

  const jobItemsSliced = jobItems.slice(0, 7);

  useEffect(() => {
    if (!searchText) {
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      const res = await fetch(`${BASE_API_URL}?search=${searchText}`);
      const data = await res.json();

      setJobItems(data.jobItems);
      setIsLoading(false);
    };

    fetchData();
  }, [searchText]);

  return { isLoading, jobItemsSliced, totalNumberOfResults } as const;
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
      onError: (error) => {
        console.log(error);
      },
    }
  );

  console.log(data);
  const jobItem = data?.jobItem;
  const isLoading = isInitialLoading;
  return { jobItem, isLoading } as const;
};

export const useDebounce = <T>(value: T, delay = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debouncedValue;
};
