import { JobItem } from "../lib/types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";
import { useActiveId } from "../lib/hooks";

type JobListProps = {
  isLoading: boolean;
  jobItems: JobItem[];
};

export function JobList({ isLoading, jobItems }: JobListProps) {
  const activeId = useActiveId();

  return (
    <ul className="job-list">
      {isLoading && <Spinner />}
      {!isLoading &&
        jobItems.map((jobItem) => (
          <JobListItem
            key={jobItem.id}
            jobItem={jobItem}
            isActive={jobItem.id === activeId}
          />
        ))}
    </ul>
  );
}

export default JobList;
