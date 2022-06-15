import React from 'react';

import Spinner from '../../Core/components/Loading/Spinner';
import Suspense from '../../Core/components/Suspense';

import { PermittedFormField } from './FormField/FormFieldTypes';

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
