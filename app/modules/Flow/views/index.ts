import { ViewRegistrations } from '../../../Module';

import ActionFlow from './ActionFlow';
import EntryPointFlow from './EntryPointFlow';
import FormFlow from './FormFlow';
import Loading from './Loading';

const views: ViewRegistrations = [
  ...ActionFlow,
  ...EntryPointFlow,
  ...FormFlow,
  ...Loading,
];

export default views;
