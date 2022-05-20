import React from 'react';

import Spinner from '../../../components/Spinner';
import { ElementsWrapperProps } from '../lib/ElementsWrapperProps';

const ElementsEditor = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "ElementsEditor" */ '../async/index'),
);

const ElementsEditorLoader = (props: ElementsWrapperProps): JSX.Element => (
  <React.Suspense fallback={<Spinner />}>
    <ElementsEditor {...props} />
  </React.Suspense>
);

export default ElementsEditorLoader;
