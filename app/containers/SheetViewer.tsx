import React from 'react';

import CardContent from '../components/Card/CardContent';
import { LoadingGridContent } from '../components/Loading';
import { MediaViewerProps } from '../components/MediaViewer/MediaViewer';
import Suspense from '../components/Suspense';

const SheetViewer = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "SheetViewer" */ '../async/SheetViewer'),
);

const SheetViewerLoader = (props: MediaViewerProps): JSX.Element => (
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
