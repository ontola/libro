import React from 'react';

import Suspense from '../components/Suspense';

const PopoutViewer = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "Studio" */ '../async/Studio/components/PopoutViewer'),
);

const PopoutViewerLoader = (): JSX.Element => (
  <Suspense>
    <PopoutViewer />
  </Suspense>
);

export default PopoutViewerLoader;
