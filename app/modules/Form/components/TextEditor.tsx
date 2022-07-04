import React, { EventHandler } from 'react';

import Spinner from '../../Common/components/Loading/Spinner';
import Suspense from '../../Kernel/components/Suspense';

export interface PlainEditorProps {
  autoFocus?: boolean;
  id: string;
  maxLength?: number;
  minLength?: number;
  onBlur: EventHandler<any>;
  onChange?: EventHandler<any>;
  onFocus: EventHandler<any>;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  value: string;
}

export interface TextEditorProps {
  autoFocus: boolean;
  maxLength: number;
  minLength: number;
  name: string;
  onBlur: (args: any) => any;
  onChange: (args: any) => void;
  onFocus: (args: any) => any;
  placeholder: string;
  required?: boolean;
  rows: number;
  value: string;
}

const TextEditor = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "Forms" */ '../async/TextEditor'),
);

const TextEditorLoader = (props: TextEditorProps): JSX.Element => {
  if (!__CLIENT__) {
    return <Spinner />;
  }

  return (
    <Suspense fallback={<Spinner />}>
      <TextEditor {...props} />
    </Suspense>
  );
};

export default TextEditorLoader;
