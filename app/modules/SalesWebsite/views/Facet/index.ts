import { register } from 'link-redux';

import FacetContainer from './FacetContainer';
import FacetPageFull from './FacetPageFull';

export default [
  ...register(FacetContainer),
  ...register(FacetPageFull),
];
