import React from 'react';
import { Redirect, useLocation } from 'react-router';

import Suspense from '../../../components/Suspense';

export interface LibroDocument {
  manifestOverride: string;
  source: string;
}

const Studio = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "Studio" */ '../async/components/Studio'),
);

const StudioLoader = (): JSX.Element => {
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const hotNotDisabled = search.get('webpack-dev-server-live-reload') === null
    || search.get('webpack-dev-server-hot') === null;

  if (hotNotDisabled) {
    return (
      <Redirect
        push
        to="/d/studio?webpack-dev-server-hot=false&webpack-dev-server-live-reload=false"
      />
    );
  }

  return (
    <Suspense>
      <Studio />
    </Suspense>
  );
};

export default StudioLoader;
