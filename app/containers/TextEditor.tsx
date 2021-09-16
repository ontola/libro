import React from 'react';

import Spinner from '../components/Spinner';
import Suspense from '../components/Suspense';

export interface TextEditorProps {
  autoFocus: boolean;
  maxLength: number;
  minLength: number;
  name: string;
  onBlur: (args: any) => any;
  onChange: (args: any) => void;
  onFocus: (args: any) => any;
  placeholder: string;
  rows: number;
  value: string;
}
const TextEditor = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "Forms" */ '../async/TextEditor'),
);

const TextEditorLoader = (props: TextEditorProps): JSX.Element => {
  if (!__CLIENT__) {
    return <Spinner loading />;
  }

  return (
    <Suspense fallback={<Spinner loading />}>
      <TextEditor {...props} />
    </Suspense>
  );
};

export default TextEditorLoader;
