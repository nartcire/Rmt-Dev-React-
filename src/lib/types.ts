export type JobItem = {
  id: number;
  badgeLetters: string;
  title: string;
  company: string;
  relevanceScore: number;
  daysAgo: number;
};

export type JobDetails = {
  badgeLetters: string;
  company: string;
  companyURL: string;
  coverImgURL: string;
  daysAgo: number;
  description: string;
  duration: string;
  id: number;
  location: string;
  qualifications: string[];
  relevanceScore: number;
  reviews: string[];
  salary: string;
  title: string;
};
