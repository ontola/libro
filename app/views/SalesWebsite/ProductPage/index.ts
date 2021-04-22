import { register } from 'link-redux';

import MoreInformationBlock from './MoreInformationBlock';
import ProductPageFull from './ProductPageFull';
import ProductPageShowcase from './ProductPageShowcase';

export default [
  ...register(MoreInformationBlock),
  ...register(ProductPageFull),
  ...register(ProductPageShowcase),
];
