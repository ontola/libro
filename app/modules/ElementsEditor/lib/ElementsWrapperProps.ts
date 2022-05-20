import { DeepRecord } from 'link-lib/dist-types/store/StructuredStore';

import { DeepSeedDataRecord } from '../../../helpers/seed';

export interface ElementsWrapperProps {
  onChange: (e: DeepRecord) => void;
  placeholder: string;
  value: DeepSeedDataRecord;
  websiteIRI: string;
}
