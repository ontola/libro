import React from 'react';

import Spinner from '../components/Spinner';

export interface ElementsEditorWrapperProps {
  onChange: (e: string) => void;
  placeholder: string;
  value: string;
}

const ElementsEditor = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "RTE" */ '../modules/Elements/async'),
);

const ElementsEditorLoader = (props: ElementsEditorWrapperProps): JSX.Element => (
  <React.Suspense fallback={<Spinner loading />}>
    <ElementsEditor {...props} />
  </React.Suspense>
);

export default ElementsEditorLoader;
