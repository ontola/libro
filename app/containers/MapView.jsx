import React from 'react';

import LinkLoader from '../components/Loading/LinkLoader';

const MapView = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "MapView" */ '../async/MapView/index')
);

class MapViewLoader extends React.PureComponent {
  render() {
    if (!__CLIENT__ || __TEST__) {
      return <LinkLoader />;
    }

    return (
      <React.Suspense fallback={<LinkLoader />}>
        <MapView {...this.props} />
      </React.Suspense>
    );
  }
}

export default MapViewLoader;
