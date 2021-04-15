import { register } from 'link-redux';

import CaseContainer from './CaseContainer';
import CaseShowcase from './CaseShowcase';

export default [
  ...register(CaseContainer),
  ...register(CaseShowcase),
];
