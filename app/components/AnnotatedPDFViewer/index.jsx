import schema from '@ontologies/schema';
import {
  Property,
  linkType, useLRS,
} from 'link-redux';
import React from 'react';

import PDFViewer from '../../containers/PDFViewer';
import argu from '../../ontology/argu';
import SideBar from '../../topologies/SideBar';
import PageWithSideBar from '../PageWithSideBar';

const AnnotatedPDFViewer = ({
  contentUrl,
}) => {
  const lrs = useLRS();
  const [pageNumber, setPageNumber] = React.useState(1);
  const handleCommentClick = React.useCallback((comment) => {
    const commentPage = lrs.getResourceProperty(comment, argu.pdfPage);
    if (commentPage) {
      setPageNumber(commentPage.value);
    }
  });

  return (
    <PageWithSideBar>
      <PDFViewer
        pageNumber={pageNumber}
        url={contentUrl.value}
        onPageNumberChange={setPageNumber}
      />
      <SideBar>
        <Property
          label={schema.comment}
          onItemClick={handleCommentClick}
        />
      </SideBar>
    </PageWithSideBar>
  );
};

AnnotatedPDFViewer.propTypes = {
  contentUrl: linkType,
};

export default AnnotatedPDFViewer;
