import { register } from 'link-redux';

import ProductPageFull from './ProductPageFull';
import ProductPageShowcase from './ProductPageShowcase';

export default [
  ...register(ProductPageFull),
  ...register(ProductPageShowcase),
];
