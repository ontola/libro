import Button from '@material-ui/core/Button';
import rdf, { isNamedNode, isNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  Property,
  literal,
  useDataInvalidation,
  useLRS,
  useProperty,
  useResourceLinks,
  useResourceProperty,
  value,
} from 'link-redux';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import PDFViewer from '../../containers/PDFViewer';
import collectionMembers from '../../helpers/diggers';
import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import { pdfMessages } from '../../translations/messages';
import PageWithSideBar from '../PageWithSideBar';

import { CommentProps } from './PDFComment';
import PDFComments from './PDFComments';

export interface AnnotatedPDFViewerProps {
  subject: SomeNode;
  url: string;
}

const commentPropMap = {
  page: literal(argu.pdfPage),
  text: value(schema.text),
  x: literal(argu.pdfPositionX),
  y: literal(argu.pdfPositionY),
};

const AnnotatedPDFViewer: React.FC<AnnotatedPDFViewerProps> = ({
  subject,
  url,
}) => {
  const lrs = useLRS();
  const intl = useIntl();
  const [commentsCollection] = useProperty(schema.comment);
  const [createCommentAction] = useResourceProperty(
    isNode(commentsCollection) ? commentsCollection : undefined,
    ontola.createAction,
  );
  const commentCollectionTimestamp = useDataInvalidation(
    isNode(commentsCollection) ? commentsCollection : undefined,
  );
  const comments = React.useMemo(() => (
    lrs
      .dig(subject, [schema.comment, ...collectionMembers])
      .filter(isNamedNode)
  ), [lrs, subject, commentCollectionTimestamp]);
  useDataInvalidation(comments.filter(isNode));
  const commentProps = useResourceLinks(comments, commentPropMap) as CommentProps[];
  const [pageNumber, setPageNumber] = React.useState(1);
  const [commentMode, setCommentMode] = React.useState<boolean>(false);
  const handlePageClick = React.useCallback((e: MouseEvent, docRef: any): void => {
    const wrapper = docRef.getBoundingClientRect();
    const scrollCorrectedX = wrapper.x + window.scrollX;
    const scrollCorrectedY = wrapper.y + window.scrollY;
    const wrapperClickDistanceX = e.pageX - scrollCorrectedX;
    const wrapperClickDistanceY = e.pageY - scrollCorrectedY;
    const xPercentage = wrapperClickDistanceX / wrapper.width;
    const yPercentage = wrapperClickDistanceY / wrapper.height;
    const x = Math.round(xPercentage * 100);
    const y = Math.round(yPercentage * 100);
    const query = `filter%5B%5D=https%253A%252F%252Fargu.co%252Fns%252Fcore%2523pdfPage%3D${pageNumber}`
      +`&filter%5B%5D=https%253A%252F%252Fargu.co%252Fns%252Fcore%2523pdfPositionX%3D${x}`
      + `&filter%5B%5D=https%253A%252F%252Fargu.co%252Fns%252Fcore%2523pdfPositionY%3D${y}`;
    const actionIRI = rdf.namedNode(`${createCommentAction.value}?${query}`);

    lrs.actions.ontola.showDialog(actionIRI);
    setCommentMode(false);
  }, [subject, pageNumber, createCommentAction]);
  const AdditionalButtons = React.useCallback(() => (
    <Button
      color="primary"
      size="small"
      variant="contained"
      onClick={() => {
        if (!commentMode) {
          lrs.actions.ontola.showSnackbar(intl.formatMessage(pdfMessages.commentClickToAdd));
        }
        setCommentMode(!commentMode);
      }}
    >
      <FormattedMessage {...(commentMode ? pdfMessages.commentModeDisable : pdfMessages.commentModeEnable)} />
    </Button>
  ), [intl, lrs, commentMode, setCommentMode]);
  const Overlay = React.useCallback(() => (
    <PDFComments
      comments={commentProps}
      currentPage={pageNumber}
    />
  ), [commentProps, pageNumber]);

  return (
    <PageWithSideBar
      sidebar={(
        <Property
          label={schema.comment}
        />
      )}
    >
      <PDFViewer
        AdditionalButtons={createCommentAction && AdditionalButtons}
        Overlay={Overlay}
        pageNumber={pageNumber}
        subject={subject}
        url={url}
        onClick={commentMode ? handlePageClick : undefined}
        onPageNumberChange={setPageNumber}
      />
    </PageWithSideBar>
  );
};

export default AnnotatedPDFViewer;
