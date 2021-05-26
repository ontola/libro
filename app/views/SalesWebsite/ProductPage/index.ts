import { register } from 'link-redux';

import MoreInformationBlockContainer from './MoreInformationBlockContainer';
import MoreInformationBlockSection from './MoreInformationBlockSection';
import ProductPageFull from './ProductPageFull';
import ProductPageShowcase from './ProductPageShowcase';

export default [
  ...register(MoreInformationBlockContainer),
  ...register(ProductPageFull),
  ...register(ProductPageShowcase),
  ...register(MoreInformationBlockSection),
];
