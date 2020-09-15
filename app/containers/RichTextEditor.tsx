import React from 'react';

import Spinner from '../components/Spinner';

export interface RichTextEditorWrapperProps {
  onChange: React.EventHandler<React.ChangeEvent<HTMLInputElement>>;
  placeholder: string;
  value: string;
}

const RichTextEditor = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "RTE" */ '../async/RichTextEditor'),
);

const RichTextEditorLoader = (props: RichTextEditorWrapperProps): JSX.Element => (
  <React.Suspense fallback={<Spinner loading />}>
    <RichTextEditor {...props} />
  </React.Suspense>
);

export default RichTextEditorLoader;
