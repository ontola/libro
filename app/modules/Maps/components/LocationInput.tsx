import React from 'react';

import { InputComponentProps } from '../../../components/FormField/FormFieldTypes';
import LinkLoader from '../../../components/Loading/LinkLoader';
import Suspense from '../../../components/Suspense';

const LocationInput = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "Maps" */ '../async/components/LocationInput'),
);

const LocationInputLoader = (props: InputComponentProps): JSX.Element => {
  if (!__CLIENT__ || __TEST__) {
    return <LinkLoader />;
  }

  return (
    <Suspense>
      <LocationInput {...props} />
    </Suspense>
  );
};

export default LocationInputLoader;
