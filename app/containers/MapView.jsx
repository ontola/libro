import React from 'react';

import Spinner from '../components/Spinner';

const MapView = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: 'TextEditor' */ '../async/MapView/index')
);

class MapViewLoader extends React.Component {
  render() {
    if (!__CLIENT__) {
      return <Spinner loading />;
    }

    return (
      <React.Suspense fallback={<Spinner loading />}>
        <MapView {...this.props} />
      </React.Suspense>
    );
  }
}

export default MapViewLoader;
