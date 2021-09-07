import React from 'react';

import LinkLoader from '../components/Loading/LinkLoader';
import Suspense from '../components/Suspense';

const PageBuilder = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "Studio" */ '../async/Studio/index'),
);

const SelectInputFieldLoader = (): JSX.Element => {
  if (!__CLIENT__ || __TEST__) {
    return <LinkLoader />;
  }

  return (
    <Suspense>
      <PageBuilder />
    </Suspense>
  );
};

export default SelectInputFieldLoader;
