import React from 'react';

import Spinner from '../../components/Spinner';

const GlappMap = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "GlappMap" */ '../../async/MapView/GlappMap')
);

class GlappMapLoader extends React.PureComponent {
  render() {
    if (!__CLIENT__ || __TEST__) {
      return <Spinner loading />;
    }

    return (
      <React.Suspense fallback={<Spinner loading />}>
        <GlappMap {...this.props} />
      </React.Suspense>
    );
  }
}

export default GlappMapLoader;
