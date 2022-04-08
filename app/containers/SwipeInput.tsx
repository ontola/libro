import React from 'react';

import { PermittedFormField } from '../components/FormField/FormFieldTypes';
import Spinner from '../components/Spinner';
import Suspense from '../components/Suspense';

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
