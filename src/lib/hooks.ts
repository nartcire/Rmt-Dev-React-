import { JobDetails, JobItem } from "./types";
import { useEffect, useState } from "react";

import { BASE_API_URL } from "./constants";

export const useJobItems = (searchText: string) => {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  return [isLoading, jobItemsSliced] as const;
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

export const useJobItem = (id: number | null) => {
  const [jobItem, setJobItem] = useState<JobDetails | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchData = async () => {
      const response = await fetch(`${BASE_API_URL}/${id}`);
      const data = await response.json();

      setJobItem(data.jobItem);
    };

    fetchData();
  }, [id]);

  return jobItem;
};
