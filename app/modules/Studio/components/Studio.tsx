import React from 'react';

import Suspense from '../../../components/Suspense';

export interface LibroDocument {
  manifestOverride: string;
  source: string;
}

const Studio = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "Studio" */ '../async/components/Studio'),
);

const StudioLoader = (): JSX.Element => (
  <Suspense>
    <Studio />
  </Suspense>
);

export default StudioLoader;
