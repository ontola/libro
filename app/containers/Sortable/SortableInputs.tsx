import React from 'react';

import Suspense from '../../components/Suspense';

const SortableInputs = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "Sortable" */ '../../async/Sortable/SortableInputs'),
);

const SortableInputsLoader = (): JSX.Element | null => {

  if (!__CLIENT__) {
    return null;
  }

  return (
    <Suspense>
      <SortableInputs />
    </Suspense>
  );
};

export default SortableInputsLoader;
