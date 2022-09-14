import React from 'react';
import { useLocation, useNavigate } from 'react-router';

import Suspense from '../../Kernel/components/Suspense';

export interface LibroDocument {
  manifestOverride: string;
  seed: string;
}

const Studio = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "Studio" */ '../async/components/Studio'),
);

const StudioLoader: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const search = new URLSearchParams(location.search);

  React.useEffect(() => {
    const hotNotDisabled = search.get('webpack-dev-server-live-reload') === null
      || search.get('webpack-dev-server-hot') === null;

    if (hotNotDisabled) {
      navigate('/libro/studio?webpack-dev-server-hot=false&webpack-dev-server-live-reload=false');
    }
  }, [search]);

  return (
    <Suspense>
      <Studio />
    </Suspense>
  );
};

export default StudioLoader;
