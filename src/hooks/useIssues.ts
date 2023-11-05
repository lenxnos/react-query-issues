import { useQuery } from '@tanstack/react-query';
import { Issue } from '../interfaces';
import { githubApi } from '../api/githubApis';

const getIssues = async (): Promise<Issue[]> => {
  const { data } = await githubApi.get<Issue[]>('/issues');
  return data;
};

export const useIssues = () => {
  return useQuery({ queryKey: ['issues'], queryFn: getIssues })
};