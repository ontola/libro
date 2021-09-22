import React from 'react';

import CardContent from '../components/Card/CardContent';
import { LoadingGridContent } from '../components/Loading';
import Suspense from '../components/Suspense';

export interface SheetViewerProps {
  url: string;
}

const SheetViewer = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "SheetViewer" */ '../async/SheetViewer'),
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
