import { register } from 'link-redux';

import FeatureShowcase from './FeatureShowcase';
import FeaturesContainer from './FeaturesContainer';

export default [
  ...register(FeatureShowcase),
  ...register(FeaturesContainer),
];
