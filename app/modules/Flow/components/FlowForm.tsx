import React from 'react';

import Suspense from '../../Core/components/Suspense';

const FlowForm = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "Flow" */ '../async/components/FlowForm'),
);

const FlowFormLoader = (): JSX.Element => (
  <Suspense>
    <FlowForm />
  </Suspense>
);

export default FlowFormLoader;
