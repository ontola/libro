import { PopupOptions } from '@typeform/embed';
import React from 'react';

import Spinner from '../components/Spinner';
import Suspense from '../components/Suspense';

export interface TypeformProps extends PopupOptions {
  popup?: boolean;
  url: string;
}

const Typeform = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "Typeform" */ '../async/Typeform'),
);

const TypeformLoader = (props: TypeformProps): JSX.Element => (
  <Suspense fallback={<Spinner loading />}>
    <Typeform {...props} />
  </Suspense>
);

export default TypeformLoader;
