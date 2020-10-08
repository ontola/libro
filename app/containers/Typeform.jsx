import React from 'react';

import Spinner from '../components/Spinner';
import Suspense from '../components/Suspense';

const Typeform = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "Typeform" */ '../async/Typeform')
);

const TypeformLoader = (props) => (
  <Suspense fallback={<Spinner loading />}>
    <Typeform {...props} />
  </Suspense>
);

export default TypeformLoader;
