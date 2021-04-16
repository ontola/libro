import { register } from 'link-redux';

import PropositionBlueBlock from './PropositionBlueBlock';
import PropositionContainer from './PropositionContainer';

export default [
  ...register(PropositionBlueBlock),
  ...register(PropositionContainer),
];
