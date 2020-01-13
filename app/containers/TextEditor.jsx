import React from 'react';

import Spinner from '../components/Spinner';

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
      <React.Suspense fallback={<Spinner loading />}>
        <TextEditor {...this.props} />
      </React.Suspense>
    );
  }
}

export default TextEditorLoader;
