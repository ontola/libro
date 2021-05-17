import { register } from 'link-redux';

import MoreInformationBlockContainer from './MoreInformationBlockContainer';
import ProductPageFull from './ProductPageFull';
import ProductPageShowcase from './ProductPageShowcase';

export default [
  ...register(MoreInformationBlockContainer),
  ...register(ProductPageFull),
  ...register(ProductPageShowcase),
];
