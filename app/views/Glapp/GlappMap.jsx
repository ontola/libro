import React from 'react';

import LinkLoader from '../../components/Loading/LinkLoader';

const GlappMap = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "GlappMap" */ '../../async/MapView/GlappMap')
);

class GlappMapLoader extends React.PureComponent {
  render() {
    if (!__CLIENT__ || __TEST__) {
      return <LinkLoader />;
    }

    return (
      <React.Suspense fallback={<LinkLoader />}>
        <GlappMap {...this.props} />
      </React.Suspense>
    );
  }
}

export default GlappMapLoader;
