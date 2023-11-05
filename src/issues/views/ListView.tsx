import { useState } from 'react';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssues } from '../../hooks';
import { LoadingIcon } from '../../shared/components/LoadingIcon';


export const ListView = () => {
  const [selectedLabels, setSeletedLabels] = useState<string[]>([]);
  const issuesQuery = useIssues();

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
          : <IssueList issues={issuesQuery.data || []} />
        }
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
