import { register } from 'link-redux';

import FacetContainer from './FacetContainer';
import FacetPage from './FacetPage';

export default [
  ...register(FacetContainer),
  ...register(FacetPage),
];
