import React from 'react';

import { LoadingGridContent } from '../components/Loading';
import Suspense from '../components/Suspense';
import { CardContent } from '../topologies/Card';

const PDFViewer = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "PDFViewer" */ '../async/PDFViewer')
);

const PDFViewerLoader = (props) => (
  <Suspense fallback={<CardContent><LoadingGridContent /></CardContent>}>
    <PDFViewer {...props} />
  </Suspense>
);

export default PDFViewerLoader;
