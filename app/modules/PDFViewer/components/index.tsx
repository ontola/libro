import { SubjectType } from 'link-redux';
import React from 'react';

import CardContent from '../../Common/components/Card/CardContent';
import { LoadingGridContent } from '../../Core/components/Loading';
import Suspense from '../../Core/components/Suspense';

export interface PDFViewerProps {
  AdditionalButtons?: React.ElementType;
  Overlay?: React.ElementType;
  url: string;
  subject: SubjectType;
  pageNumber: number;
  onClick?: (e: MouseEvent, docRef: any) => void;
  onPageNumberChange: (num: number) => void;
}

const PDFViewer = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "PDFViewer" */ '../async'),
);

const PDFViewerLoader = (props: PDFViewerProps): JSX.Element => (
  <Suspense
    fallback={(
      <CardContent>
        <LoadingGridContent />
      </CardContent>
    )}
  >
    <PDFViewer {...props} />
  </Suspense>
);

export default PDFViewerLoader;
