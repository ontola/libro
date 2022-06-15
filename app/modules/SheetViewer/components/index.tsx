import React from 'react';

import CardContent from '../../Common/components/Card/CardContent';
import { LoadingGridContent } from '../../Core/components/Loading';
import Suspense from '../../Core/components/Suspense';

export interface SheetViewerProps {
  url: string;
}

const SheetViewer = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "SheetViewer" */ '../async'),
);

const SheetViewerLoader = (props: SheetViewerProps): JSX.Element => (
  <Suspense
    fallback={(
      <CardContent>
        <LoadingGridContent />
      </CardContent>
    )}
  >
    <SheetViewer {...props} />
  </Suspense>
);

export default SheetViewerLoader;
