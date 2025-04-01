import JobList from "./JobList";
import { useJobItemsContext } from "../lib/hooks";

export default function JobListSearch() {
  const { isLoading, jobItemsSliced } = useJobItemsContext();

  return <JobList isLoading={isLoading} jobItems={jobItemsSliced} />;
}
