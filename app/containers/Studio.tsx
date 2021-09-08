import React from 'react';

import Suspense from '../components/Suspense';

const Studio = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "Studio" */ '../async/Studio'),
);

const StudioLoader = (): JSX.Element => {
  console.log(Studio);

  return (
    <div>
      <h1>
        test
      </h1>
      <Suspense>
        <Studio />
      </Suspense>
    </div>
  );
};

export default StudioLoader;
