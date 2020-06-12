import rdf, { NamedNode } from '@ontologies/core';
import {
  linkType,
  useLRS,
  useResourceProperty,
} from 'link-redux';
import PropTypes from 'prop-types';
import React, { EventHandler } from 'react';
import parser from 'uri-template';

import { entityIsLoaded } from '../../helpers/data';
import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import Image from '../Image';

import './AttachmentPreview.scss';

const AttachmentPreview: React.FC<any> = ({
  caption,
  contentUrl,
  filename,
  isPartOf,
  sequenceIndex,
  thumbnailURL,
}) => {
  const lrs = useLRS();
  const [attachments] = useResourceProperty(isPartOf, argu.attachments) as NamedNode[];
  const [attachmentsIriTemplate] = useResourceProperty(attachments, ontola.iriTemplate) as NamedNode[];

  React.useEffect(() => {
    if (__CLIENT__ && isPartOf && !entityIsLoaded(lrs, isPartOf)) {
      lrs.queueEntity(isPartOf);
    }
    if (__CLIENT__ && attachments && !entityIsLoaded(lrs, attachments)) {
      lrs.queueEntity(attachments);
    }
  }, [
    isPartOf && !entityIsLoaded(lrs, isPartOf),
    attachments && !entityIsLoaded(lrs, attachments),
  ]);

  let wrapperProps;

  if (contentUrl) {
    wrapperProps = {
      download: true,
      href: contentUrl.value,
      title: 'Download',
    };
  } else {
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
    const handleClick: EventHandler<any> = (e) => {
      e.preventDefault();
      lrs.actions.app.changePage(attachmentsIri, attachmentsPageIri);
      lrs.actions.ontola.showDialog(attachmentsPageIri);
    };
    wrapperProps = {
      href: attachmentsPageIri.value,
      onClick: handleClick,
    };
  }
  const label = caption && caption.value ? caption.value : filename && filename.value;

  return (
    <a
      className="AttachmentPreview"
      rel="noopener noreferrer"
      target="_blank"
      {...wrapperProps}
    >
      <Image className="AttachmentPreview__image" linkedProp={thumbnailURL} />
      {label && (
        <h1 className="AttachmentPreview__title" title={label}>
          {label}
        </h1>
      )}
    </a>
  );
};

AttachmentPreview.propTypes = {
  caption: linkType,
  contentUrl: linkType,
  filename: linkType.isRequired,
  isPartOf: linkType,
  sequenceIndex: PropTypes.number,
  thumbnailURL: linkType,
};

export default AttachmentPreview;
