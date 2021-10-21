import rdf, {
  SomeTerm,
  isNamedNode,
} from '@ontologies/core';
import { SomeNode } from 'link-lib';
import {
  useDataFetching,
  useIds,
  useLRS,
  useStrings,
} from 'link-redux';
import React from 'react';
import parser from 'uri-template';

import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';

import { DocumentAttachmentPreview } from './DocumentAttachmentPreview';
import { ImageAttachmentPreview } from './ImageAttachmentPreview';

interface AttachmentPreviewProps {
  caption: SomeTerm;
  contentUrl: SomeTerm;
  filename: SomeTerm;
  isDocument: boolean;
  isPartOf: SomeNode;
  sequenceIndex: number;
  showPreviewDialog?: boolean;
  thumbnailURL: SomeTerm;
}

const usePreviewHandler = (isPartOf: SomeNode, sequenceIndex: number) => {
  const lrs = useLRS();
  const [attachments] = useIds(isPartOf, argu.attachments);
  const [attachmentsIriTemplate] = useStrings(attachments, ontola.iriTemplate);
  const attachmentsTemplate = attachmentsIriTemplate ? parser.parse(attachmentsIriTemplate) : undefined;
  const attachmentsIri = attachmentsTemplate ? rdf.namedNode(attachmentsTemplate.expand({
    display: 'default',
    page_size: 1,
  })) : undefined;
  const attachmentsPageIri = attachmentsTemplate ? rdf.namedNode(attachmentsTemplate.expand({
    display: 'default',
    page: (sequenceIndex || 0) + 1,
    page_size: 1,
  })) : undefined;
  useDataFetching([isPartOf, attachments, attachmentsIri, attachmentsPageIri].filter(isNamedNode));

  return React.useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    lrs.actions.app.changePage(attachmentsIri, attachmentsPageIri);
    lrs.actions.ontola.showDialog(attachmentsPageIri);
  }, [attachmentsIri, attachmentsPageIri]);
};

const AttachmentPreview = ({
  caption,
  contentUrl,
  isDocument,
  filename,
  isPartOf,
  sequenceIndex,
  showPreviewDialog,
  thumbnailURL,
}: AttachmentPreviewProps): JSX.Element => {
  const handleClick = usePreviewHandler(isPartOf, sequenceIndex);
  const label = caption && caption.value ? caption.value : filename && filename.value;

  const Preview = isDocument ? DocumentAttachmentPreview : ImageAttachmentPreview;

  return (
    <Preview
      downloadURL={contentUrl?.value}
      label={label}
      showPreviewDialog={!!showPreviewDialog}
      thumbnailURL={thumbnailURL}
      onPreviewClick={handleClick}
    />
  );
};

export default AttachmentPreview;
