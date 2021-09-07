import React from 'react';

import Suspense from '../components/Suspense';

const Studio = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "Studio" */ '../async/Studio'),
);

const StudioLoader = (): JSX.Element => (
  <Suspense>
    <Studio />
  </Suspense>
);

export default StudioLoader;
