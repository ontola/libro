import rdf, {
  NamedNode,
  SomeTerm,
  isNamedNode,
} from '@ontologies/core';
import { SomeNode } from 'link-lib';
import {
  useLRS,
  useResourceProperty,
} from 'link-redux';
import React, { MouseEventHandler } from 'react';
import parser from 'uri-template';

import { entityIsLoaded } from '../../helpers/data';
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
  const lrs = useLRS();
  const [attachments] = useResourceProperty(isPartOf, argu.attachments) as NamedNode[];
  const [attachmentsIriTemplate] = useResourceProperty(attachments, ontola.iriTemplate) as NamedNode[];

  React.useEffect(() => {
    if (__CLIENT__ && isPartOf && !entityIsLoaded(lrs, isPartOf) && isNamedNode(isPartOf)) {
      lrs.queueEntity(isPartOf);
    }

    if (__CLIENT__ && attachments && !entityIsLoaded(lrs, attachments) && isNamedNode(attachments)) {
      lrs.queueEntity(attachments);
    }
  }, [
    isPartOf && !entityIsLoaded(lrs, isPartOf),
    attachments && !entityIsLoaded(lrs, attachments),
  ]);

  const attachmentsTemplate = parser.parse(attachmentsIriTemplate.value);
  const attachmentsIri = rdf.namedNode(attachmentsTemplate.expand({
    display: 'default',
    page_size: 1,
  }));
  const attachmentsPageIri = rdf.namedNode(attachmentsTemplate.expand({
    display: 'default',
    page: (sequenceIndex || 0) + 1,
    page_size: 1,
  }));

  if (__CLIENT__ && !entityIsLoaded(lrs, attachmentsIri)) {
    lrs.queueEntity(attachmentsIri);
  }

  if (__CLIENT__ && !entityIsLoaded(lrs, attachmentsPageIri)) {
    lrs.queueEntity(attachmentsPageIri);
  }

  const handleClick: MouseEventHandler = (e) => {
    e.preventDefault();
    lrs.actions.app.changePage(attachmentsIri, attachmentsPageIri);
    lrs.actions.ontola.showDialog(attachmentsPageIri);
  };

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
