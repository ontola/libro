import React from 'react';

import { InputComponentProps } from '../components/FormField/InputComponentProps';
import LinkLoader from '../components/Loading/LinkLoader';
import Suspense from '../components/Suspense';
import useFontsChecker from '../hooks/useFontsChecker';

const IconInputField = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "Forms" */ '../async/IconInputField'),
);

const SelectInputFieldLoader = (props: InputComponentProps): JSX.Element => {
  if (!__CLIENT__ || __TEST__) {
    return <LinkLoader />;
  }

  const fontLoaded = useFontsChecker('normal 18px FontAwesome');

  if (!fontLoaded) {
    return <LinkLoader />;
  }

  return (
    <Suspense>
      <IconInputField {...props} />
    </Suspense>
  );
};

export default SelectInputFieldLoader;
