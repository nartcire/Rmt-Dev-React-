import { JobItem } from "../lib/types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

type JobListProps = {
  isLoading: boolean;
  jobItems: JobItem[];
};

export function JobList({ isLoading, jobItems }: JobListProps) {
  return (
    <ul className="job-list">
      {isLoading && <Spinner />}
      {!isLoading &&
        jobItems.map((jobItem) => (
          <JobListItem key={jobItem.id} jobItem={jobItem} />
        ))}
    </ul>
  );
}

export default JobList;
