import React from 'react';

import Spinner from '../components/Spinner';

const RichTextEditor = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "RTE" */ '../async/TextEditor/RichTextEditorComp')
);

const RichTextEditorLoader = (props) => {
  return (
    <React.Suspense fallback={<Spinner loading />}>
      <RichTextEditor {...props} />
    </React.Suspense>
  );
};

export default RichTextEditorLoader;
