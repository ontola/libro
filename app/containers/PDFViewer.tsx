import { SubjectType } from 'link-redux';
import React from 'react';

import CardContent from '../components/Card/CardContent';
import { LoadingGridContent } from '../components/Loading';
import Suspense from '../components/Suspense';

export interface PDFViewerProps {
  url: string;
  subject: SubjectType;
}

const PDFViewer = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "PDFViewer" */ '../async/PDFViewer'),
);

const PDFViewerLoader = (props: PDFViewerProps): JSX.Element => (
  <Suspense fallback={<CardContent><LoadingGridContent /></CardContent>}>
    <PDFViewer {...props} />
  </Suspense>
);

export default PDFViewerLoader;
