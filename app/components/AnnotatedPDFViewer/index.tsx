import Button from '@mui/material/Button';
import rdf, { isNamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  Property,
  literal,
  useDataInvalidation,
  useFields,
  useIds,
  useLRS,
  useResourceLinks,
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
  const [commentsCollection] = useIds(schema.comment);
  const [createCommentAction] = useFields(commentsCollection, ontola.createAction);
  const commentCollectionTimestamp = useDataInvalidation(commentsCollection);
  const comments = React.useMemo(() => (
    lrs
      .dig(subject, [schema.comment, ...collectionMembers])
      .filter(isNamedNode)
  ), [lrs, subject, commentCollectionTimestamp]);
  useDataInvalidation(comments);
  const commentProps = useResourceLinks(comments, commentPropMap) as CommentProps[];
  const [pageNumber, setPageNumber] = React.useState(1);
  const handleCommentClick = React.useCallback((comment) => {
    const commentPage = commentProps.find(({ subject: subj }) => rdf.equals(subj, comment))?.page;

    if (commentPage) {
      setPageNumber(commentPage);
    }
  }, [lrs, setPageNumber]);
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
    const actionURI = new URL(createCommentAction.value);
    actionURI.searchParams.append('filter[]', `https%3A%2F%2Fargu.co%2Fns%2Fcore%23pdfPage=${pageNumber}`);
    actionURI.searchParams.append('filter[]', `https%3A%2F%2Fargu.co%2Fns%2Fcore%23pdfPositionX=${x}`);
    actionURI.searchParams.append('filter[]', `https%3A%2F%2Fargu.co%2Fns%2Fcore%23pdfPositionY=${y}`);
    actionURI.searchParams.sort();
    const actionIRI = rdf.namedNode(actionURI.toString());

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
          onItemClick={handleCommentClick}
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
