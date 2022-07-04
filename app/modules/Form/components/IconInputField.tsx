import React from 'react';

import useFontsChecker from '../../Common/hooks/useFontsChecker';
import LinkLoader from '../../Kernel/components/LinkLoader';
import Suspense from '../../Kernel/components/Suspense';

import { InputComponentProps } from './FormField/FormFieldTypes';

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
