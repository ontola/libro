import schema from '@ontologies/schema';
import {
  Property,
  linkType,
  subjectType,
  useLRS,
} from 'link-redux';
import React from 'react';

import PDFViewer from '../../containers/PDFViewer';
import argu from '../../ontology/argu';
import PageWithSideBar from '../PageWithSideBar';

const AnnotatedPDFViewer = ({
  contentUrl,
  subject,
}) => {
  const lrs = useLRS();
  const [pageNumber, setPageNumber] = React.useState(1);
  const handleCommentClick = React.useCallback((comment) => {
    const commentPage = lrs.getResourceProperty(comment, argu.pdfPage);
    if (commentPage) {
      const num = Number(commentPage.value);
      setPageNumber(num);
    }
  });

  return (
    <PageWithSideBar
      sidebar={(
        <Property
          label={schema.comment}
          onItemClick={handleCommentClick}
        />
      )}
    >
      <PDFViewer
        pageNumber={pageNumber}
        subject={subject}
        url={contentUrl.value}
        onPageNumberChange={setPageNumber}
      />
    </PageWithSideBar>
  );
};

AnnotatedPDFViewer.propTypes = {
  contentUrl: linkType,
  subject: subjectType,
};

export default AnnotatedPDFViewer;
