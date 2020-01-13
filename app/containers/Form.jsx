import React from 'react';

import Spinner from '../components/Spinner';

const Form = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "Forms" */ '../components/Form/Form')
);

const FormLoader = (props) => (
  <React.Suspense fallback={<Spinner loading />}>
    <Form {...props} />
  </React.Suspense>
);

export default FormLoader;
