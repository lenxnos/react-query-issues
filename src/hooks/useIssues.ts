import { useQuery } from '@tanstack/react-query';
import { Issue, State } from '../interfaces';
import { githubApi } from '../api/githubApis';

interface Props {
  state?: State;
  labels: string[];
}

const getIssues = async (labels: string[] = [], state?: State): Promise<Issue[]> => {
  const params = new URLSearchParams();
  if (state) params.append('state', state);
  if (labels.length > 0) params.append('labels', labels.join(','));

  params.append('page', '1');
  params.append('per_page', '5');

  const { data } = await githubApi.get<Issue[]>('/issues', { params });
  return data;
};

export const useIssues = ({ state, labels }: Props) => {
  return useQuery({
    queryKey: ['issues', { state, labels }],
    queryFn: () => getIssues(labels, state),
  })
};