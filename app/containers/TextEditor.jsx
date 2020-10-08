import React from 'react';

import Spinner from '../components/Spinner';
import Suspense from '../components/Suspense';

const TextEditor = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "Forms" */ '../async/TextEditor/index')
);

class TextEditorLoader extends React.Component {
  render() {
    if (!__CLIENT__) {
      return <Spinner loading />;
    }

    return (
      <Suspense fallback={<Spinner loading />}>
        <TextEditor {...this.props} />
      </Suspense>
    );
  }
}

export default TextEditorLoader;
