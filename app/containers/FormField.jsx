import React from 'react';

import Suspense from '../components/Suspense';

const FormField = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "Forms" */ '../components/FormField/FormField')
);

const FormFieldLoader = (props) => (
  <Suspense>
    <FormField {...props} />
  </Suspense>
);

export default FormFieldLoader;
