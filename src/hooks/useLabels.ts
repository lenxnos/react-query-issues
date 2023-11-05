import { useQuery } from '@tanstack/react-query';
import { githubApi } from '../api/githubApis';
import { Label } from '../interfaces/label';

const getLabels = async (): Promise<Label[]> => {
  const { data } = await githubApi.get('/labels');
  return data;
};

export const useLabels = () => {
  return useQuery({ queryKey: ['labels'], queryFn: getLabels, refetchOnWindowFocus: false, staleTime: 1000 * 60 * 60 });
};
