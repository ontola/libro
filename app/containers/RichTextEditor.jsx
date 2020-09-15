import React from 'react';

import Spinner from '../components/Spinner';

const RichTextEditor = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "Forms" */ '../async/RichTextEditor')
);

const RichTextEditorLoader = (props) => {
  if (!__CLIENT__) {
    return <Spinner loading />;
  }

  return (
    <React.Suspense fallback={<Spinner loading/>}>
      <RichTextEditor {...props} />
    </React.Suspense>
  )
}

export default RichTextEditorLoader;
