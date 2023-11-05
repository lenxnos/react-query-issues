import { useState } from 'react';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssuesInfinite } from '../../hooks';
import { LoadingIcon } from '../../shared/components/LoadingIcon';
import { State } from '../../interfaces';


export const ListViewInfinite = () => {
  const [selectedLabels, setSeletedLabels] = useState<string[]>([]);
  const [state, setState] = useState<State>();
  const { issuesQuery } = useIssuesInfinite({ state, labels: selectedLabels });

  const onLabelChange = (labelName: string) => {
    setSeletedLabels((prev) => {
      if (prev.includes(labelName)) {
        return prev.filter((label) => label !== labelName);
      }
      return [...prev, labelName];
    });
  }

  return (
    <div className="row mt-5">
      <div className="col-8">
        {issuesQuery.isLoading ? <LoadingIcon />
          : (
            <IssueList
              issues={issuesQuery.data?.pages.flat() || []}
              state={state}
              onStateChange={(newState) => setState(newState)} 
            />
          )
        }

        <button
          disabled={!issuesQuery.hasNextPage}
          className='btn btn-outline-primary mt-2'
          onClick={() => issuesQuery.fetchNextPage()}
        >
          Load More...
        </button>
      </div>

      <div className="col-4">
        <LabelPicker
          selectedLabels={selectedLabels}
          onChange={onLabelChange}
        />
      </div>
    </div>
  )
}
