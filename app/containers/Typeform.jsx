import React from 'react';

import Spinner from '../components/Spinner';

const Typeform = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "Typeform" */ '../async/Typeform')
);

const TypeformLoader = (props) => (
  <React.Suspense fallback={<Spinner loading />}>
    <Typeform {...props} />
  </React.Suspense>
);

export default TypeformLoader;
