import React from 'react';

import LinkLoader from '../components/Loading/LinkLoader';
import Suspense from '../components/Suspense';

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
      <Suspense>
        <MapView {...this.props} />
      </Suspense>
    );
  }
}

export default MapViewLoader;
