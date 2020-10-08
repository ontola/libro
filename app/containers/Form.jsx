import React from 'react';

import { LoadingGridContent } from '../components/Loading';
import Suspense from '../components/Suspense';
import { withFormLRS } from '../hooks/useFormLRS';
import { CardContent } from '../topologies/Card';

const Form = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "Forms" */ '../components/Form/Form')
);

const FormLoader = (props) => (
  <Suspense fallback={<CardContent><LoadingGridContent /></CardContent>}>
    <Form {...props} />
  </Suspense>
);

export default withFormLRS(FormLoader);
