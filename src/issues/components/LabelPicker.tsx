import { FC } from 'react';
import { useLabels } from '../../hooks';
import { LoadingIcon } from '../../shared/components/LoadingIcon';

interface Props {
  selectedLabels: Array<string>;
  onChange: (labelName: string) => void;
}

export const LabelPicker: FC<Props> = ({ onChange, selectedLabels }) => {
  const labelsQuery = useLabels();

  if (labelsQuery.isLoading) return <LoadingIcon />;

  return (
    <div>
      {labelsQuery.data?.map((label) => (
        <span
          key={label.id}
          className={`badge rounded-pill m-1 label-picker ${selectedLabels.includes(label.name) ? 'label-active' : ''}`}
          style={{ border: `1px solid #${label.color}`, color: `#${label.color}` }}
          onClick={() => onChange(label.name)}
        >
          {label.name}
        </span>
      ))}

    </div>
  )
}
