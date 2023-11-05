import { useQuery } from '@tanstack/react-query';
import { githubApi } from '../api/githubApis';
import { Label } from '../interfaces';

const getLabels = async (): Promise<Label[]> => {
  const { data } = await githubApi.get('/labels?per_page=100');
  return data;
};

export const useLabels = () => {
  return useQuery({
    queryKey: ['labels'],
    queryFn: getLabels,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
    placeholderData: [{
      "id": 196858374,
      "node_id": "MDU6TGFiZWwxOTY4NTgzNzQ=",
      "url": "https://api.github.com/repos/facebook/react/labels/CLA%20Signed",
      "name": "CLA Signed",
      "color": "e7e7e7",
      "default": false,
      "description": null
    },
    {
      "id": 69105358,
      "node_id": "MDU6TGFiZWw2OTEwNTM1OA==",
      "url": "https://api.github.com/repos/facebook/react/labels/Browser:%20Safari",
      "name": "Browser: Safari",
      "color": "c7def8",
      "default": false,
      "description": null
    }]
  });
};
