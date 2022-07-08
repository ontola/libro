import { register } from 'link-redux';

import CasePageFull from './CasePageFull';
import CasePageShowcase from './CasePageShowcase';

export default [
  ...register(CasePageShowcase),
  ...CasePageFull,
];
