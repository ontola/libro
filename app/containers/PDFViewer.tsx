import React from 'react';

import CardContent from '../components/Card/CardContent';
import { LoadingGridContent } from '../components/Loading';
import Suspense from '../components/Suspense';

const PDFViewer = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "PDFViewer" */ '../async/PDFViewer'),
);

const PDFViewerLoader = (props: any) => (
  <Suspense fallback={<CardContent><LoadingGridContent /></CardContent>}>
    <PDFViewer {...props} />
  </Suspense>
);

export default PDFViewerLoader;
