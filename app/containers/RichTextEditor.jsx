import React from 'react';

import Spinner from '../components/Spinner';

const RichTextEditor = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "RTE" */ '../async/RichTextEditor')
);

const RichTextEditorLoader = (props) => (
  <React.Suspense fallback={<Spinner loading />}>
    <RichTextEditor {...props} />
  </React.Suspense>
);

export default RichTextEditorLoader;
