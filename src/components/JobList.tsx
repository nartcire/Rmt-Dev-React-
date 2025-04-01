import { ActiveIdContext } from "../contexts/ActiveIdContextProvider";
import { JobItem } from "../lib/types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";
import { useContext } from "react";

type JobListProps = {
  isLoading: boolean;
  jobItems: JobItem[];
};

export function JobList({ isLoading, jobItems }: JobListProps) {
  const context = useContext(ActiveIdContext);
  if (!context) {
    throw new Error(
      "JobItemContext component must be used within ActiveIdContextProviders."
    );
  }
  const activeId = context.activeId;

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
