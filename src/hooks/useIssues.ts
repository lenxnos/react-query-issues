import { useQuery } from '@tanstack/react-query';
import { Issue, State } from '../interfaces';
import { githubApi } from '../api/githubApis';
import { useEffect, useState } from 'react';

interface Props {
  state?: State;
  labels: string[];
  page?: Number;
}

const getIssues = async ({ labels = [], state, page }: { labels: string[], state?: State, page: Number }): Promise<Issue[]> => {
  const params = new URLSearchParams();
  if (state) params.append('state', state);
  if (labels.length > 0) params.append('labels', labels.join(','));

  params.append('page', page.toString());
  params.append('per_page', '5');

  const { data } = await githubApi.get<Issue[]>('/issues', { params });
  return data;
};

export const useIssues = ({ state, labels }: Props) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [state, labels]);

  const issuesQuery = useQuery({
    queryKey: ['issues', { state, labels, page }],
    queryFn: () => getIssues({ labels, page, state }),
  });

  const nextPage = () => {
    if (issuesQuery.data?.length === 0) return;
    setPage(page + 1);
  }

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return {
    issuesQuery,
    page: issuesQuery.isFetching ? 'loading...' : page,
    setPage,
    nextPage,
    prevPage,
  }
};