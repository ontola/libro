import React from 'react';

import LinkLoader from '../../Kernel/components/LinkLoader';
import Suspense from '../../Kernel/components/Suspense';
import { InputComponentProps } from '../../Form/components/FormField/FormFieldTypes';

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
