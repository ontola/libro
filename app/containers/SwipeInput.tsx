import React from 'react';

import Spinner from '../components/Spinner';
import Suspense from '../components/Suspense';
import { PermittedFormField } from '../hooks/useFormField';

const SwipeInput = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "Forms" */ '../async/SwipeInput'),
);

const SwipeInputLoader = (props: PermittedFormField): JSX.Element => {
  if (!__CLIENT__) {
    return <Spinner />;
  }

  return (
    <Suspense fallback={<Spinner />}>
      <SwipeInput {...props} />
    </Suspense>
  );
};

export default SwipeInputLoader;
