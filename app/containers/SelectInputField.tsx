import React from 'react';

import LinkLoader from '../components/Loading/LinkLoader';
import Suspense from '../components/Suspense';
import useFontsChecker from '../hooks/useFontsChecker';

const SelectInputField = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "Forms" */ '../async/SelectInput/SelectInputField'),
);

const SelectInputFieldLoader = (): JSX.Element => {
  if (!__CLIENT__ || __TEST__) {
    return <LinkLoader />;
  }

  const fontLoaded = useFontsChecker('normal 18px FontAwesome');

  if (!fontLoaded) {
    return <LinkLoader />;
  }

  return (
    <Suspense>
      <SelectInputField />
    </Suspense>
  );
};

export default SelectInputFieldLoader;
