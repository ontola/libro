import React from 'react';

import LinkLoader from '../../components/Loading/LinkLoader';
import Suspense from '../../components/Suspense';
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
    <Suspense>
      <GlappMap {...props} />
    </Suspense>
  );
};

export default GlappMapLoader;
