import React from 'react';

import Spinner from '../../../components/Spinner';
import { ElementsWrapperProps } from '../lib/ElementsWrapperProps';

const Elements = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "RTE" */ '../async/index'),
);

const ElementsLoader = (props: ElementsWrapperProps): JSX.Element => (
  <React.Suspense fallback={<Spinner />}>
    <Elements {...props} />
  </React.Suspense>
);

export default ElementsLoader;
