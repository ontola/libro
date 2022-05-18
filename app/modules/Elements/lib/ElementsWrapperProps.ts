import { DeepRecord } from 'link-lib/dist-types/store/StructuredStore';

export interface ElementsWrapperProps {
  onChange: (e: DeepRecord) => void;
  placeholder: string;
  value: DeepRecord;
}
