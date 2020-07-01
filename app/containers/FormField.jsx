import React from 'react';

import Spinner from '../components/Spinner';

const FormField = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "Forms" */ '../components/FormField/FormField')
);

const FormFieldLoader = (props) => (
  <React.Suspense fallback={<Spinner loading />}>
    <FormField {...props} />
  </React.Suspense>
);

export default FormFieldLoader;
