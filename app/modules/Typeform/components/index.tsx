import { PopupOptions } from '@typeform/embed';
import React from 'react';

import Spinner from '../../Core/components/Loading/Spinner';
import Suspense from '../../Core/components/Suspense';

export interface TypeformProps extends PopupOptions {
  popup?: boolean;
  url: string;
}

const Typeform = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "Typeform" */ '../async'),
);

const TypeformLoader = (props: TypeformProps): JSX.Element => (
  <Suspense fallback={<Spinner />}>
    <Typeform {...props} />
  </Suspense>
);

export default TypeformLoader;
