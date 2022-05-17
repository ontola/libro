import { DeepRecord } from 'link-lib/dist-types/store/StructuredStore';

export interface ElementsWrapperProps {
  onChange: (e: string) => void;
  placeholder: string;
  value: DeepRecord;
}
