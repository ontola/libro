import React from 'react';

import LinkLoader from '../../components/Loading/LinkLoader';
import useFontsChecker from '../../hooks/useFontsChecker';

const GlappMap = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "GlappMap" */ '../../async/MapView/GlappMap')
);

const GlappMapLoader = (props) => {
  if (!__CLIENT__ || __TEST__) {
    return <LinkLoader />;
  }

  const fontLoaded = useFontsChecker('normal 18px FontAwesome');

  if (!fontLoaded) {
    return <LinkLoader />;
  }

  return (
    <React.Suspense fallback={<LinkLoader />}>
      <GlappMap {...props} />
    </React.Suspense>
  );
};

export default GlappMapLoader;
