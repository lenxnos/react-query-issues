import { useQuery } from "@tanstack/react-query";
import { Issue } from "../interfaces";
import { githubApi } from "../api/githubApis";

const getIssueInfo = async (issueNumber: number): Promise<Issue> => {
  const { data } = await githubApi.get<Issue>(`/issues/${issueNumber}`);
  return data;
}

const getIssueComments = async (issueNumber: number): Promise<Issue[]> => {
  const { data } = await githubApi.get(`/issues/${issueNumber}/comments`);
  return data;
};

export const useIssue = (issueNumber: number) => {
  const issueQuery = useQuery({ queryKey: ["issue", issueNumber], queryFn: () => getIssueInfo(issueNumber) });
  const issueCommentsQuery = useQuery({ queryKey: ["issue", issueNumber, 'comments'], queryFn: () => getIssueComments(issueNumber), enabled: (issueQuery.data?.comments ?? 0) > 0 });
  return { issueQuery, issueCommentsQuery };
};