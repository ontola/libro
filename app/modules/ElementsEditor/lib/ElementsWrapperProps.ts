import { DeepRecord } from 'link-lib';

import { DeepSeedDataRecord } from '../../Common/lib/seed';

export interface ElementsWrapperProps {
  onChange: (e: DeepRecord) => void;
  placeholder: string;
  value: DeepSeedDataRecord;
  websiteIRI: string;
}
