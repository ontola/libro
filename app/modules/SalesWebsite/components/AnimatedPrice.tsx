import React from 'react';

import Suspense from '../../Kernel/components/Suspense';
import { PricingInterval } from '../lib/PricingInterval';

export interface AnimatedPriceProps {
  color: string;
  interval: PricingInterval;
  priceMonthly: number;
  priceStatic: string;
  priceYearly: number;
}

const AnimatedPrice = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "SalesWebsite" */ '../async/AnimatedPrice'),
);

const AnimatedPriceLoader = (props: AnimatedPriceProps): JSX.Element => (
  <Suspense>
    <AnimatedPrice {...props} />
  </Suspense>
);

export default AnimatedPriceLoader;
