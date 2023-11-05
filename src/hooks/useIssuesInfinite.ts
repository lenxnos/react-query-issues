import { useInfiniteQuery } from '@tanstack/react-query';
import { githubApi } from '../api/githubApis';
import { Issue, State } from '../interfaces';


const getIssues = async ({ queryKey, pageParam: page = 1 }: QueryProps): Promise<Issue[]> => {
  const [, , args] = queryKey;
  const { labels, state } = args as Props;
  const params = new URLSearchParams();
  if (state) params.append('state', state);
  if (labels.length > 0) params.append('labels', labels.join(','));

  params.append('page', page.toString());
  params.append('per_page', '5');

  const { data } = await githubApi.get<Issue[]>('/issues', { params });
  return data;
};

interface Props {
  state?: State;
  labels: string[];
}

interface QueryProps {
  pageParam?: number;
  queryKey: (string | Props)[];
}

export const useIssuesInfinite = ({ state, labels }: Props) => {

  const issuesQuery = useInfiniteQuery(
    {
      queryKey: ['issues', 'infinite', { state, labels }],
      initialPageParam: 1,
      queryFn: (data) => getIssues(data as QueryProps),
      getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
        if (lastPage.length === 0) return;
        return allPages.length + 1; // The next page is the page number incremented by 1
      },
      getPreviousPageParam: (firstPage, allPages, firstPageParam, allPageParams) => {
        if (firstPage.length === 0) return;
        return allPages.length - 1; // The previous page is the page number decremented by 1
      }

    });

  return { issuesQuery };
};