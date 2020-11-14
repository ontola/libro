import schema from '@ontologies/schema';
import {
  Property,
  linkType,
  subjectType,
  useDataInvalidation,
  useLRS,
  useProperty,
} from 'link-redux';
import React from 'react';

import PDFViewer from '../../containers/PDFViewer';
import collectionMembers from '../../helpers/diggers';
import { tryParseInt } from '../../helpers/numbers';
import argu from '../../ontology/argu';
import PageWithSideBar from '../PageWithSideBar';

const AnnotatedPDFViewer = ({
  contentUrl,
  subject,
}) => {
  const lrs = useLRS();
  const commentsCollection = useProperty(schema.comment);
  useDataInvalidation(commentsCollection);
  const comments = lrs
    .dig(subject, [schema.comment, ...collectionMembers])
    .map((comment) => ({
      page: tryParseInt(lrs.getResourceProperty(comment, argu.pdfPage)),
      text: lrs.getResourceProperty(comment, schema.text)?.value,
      x: tryParseInt(lrs.getResourceProperty(comment, argu.pdfPositionX)),
      y: tryParseInt(lrs.getResourceProperty(comment, argu.pdfPositionY)),
    }));
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
        comments={comments}
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
