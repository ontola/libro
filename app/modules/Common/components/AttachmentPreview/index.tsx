import rdf, { SomeTerm, isNamedNode } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import {
  useDataFetching,
  useIds,
  useLRS,
  useStrings,
} from 'link-redux';
import React from 'react';
import parser from 'uri-template';

import argu from '../../../Argu/ontology/argu';
import ontola from '../../../../ontology/ontola';

import { DocumentAttachmentPreview } from './DocumentAttachmentPreview';
import { ImageAttachmentPreview } from './ImageAttachmentPreview';

interface SharedAttachmentProps {
  caption: SomeTerm;
  filename: SomeTerm;
  isPartOf: SomeNode;
  sequenceIndex: number;
  showPreviewDialog?: boolean;
  thumbnailURL: SomeTerm;
}

interface DocumentAttachmentProps extends SharedAttachmentProps {
  isDocument?: false;
  contentUrl?: undefined;
}

interface ImageAttachmentProps extends SharedAttachmentProps {
  isDocument: true;
  contentUrl: SomeTerm;
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

const AttachmentPreview = (props: DocumentAttachmentProps | ImageAttachmentProps): JSX.Element => {
  const {
    caption,
    filename,
    isPartOf,
    sequenceIndex,
    showPreviewDialog,
    thumbnailURL,
  } = props;
  const handleClick = usePreviewHandler(isPartOf, sequenceIndex);
  const label = caption && caption.value ? caption.value : filename && filename.value;
  const sharedProps = {
    label,
    onPreviewClick: handleClick,
    showPreviewDialog: !!showPreviewDialog,
    thumbnailURL,
  };

  if (props.isDocument) {
    return (
      <DocumentAttachmentPreview
        downloadURL={props.contentUrl?.value}
        {...sharedProps}
      />
    );
  }

  return (
    <ImageAttachmentPreview
      {...sharedProps}
    />
  );
};

export default AttachmentPreview;
