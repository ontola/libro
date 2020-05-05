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

  const handleClick: EventHandler<any> = (e) => {
    if (contentUrl) {
      window.open(contentUrl.value);
    } else {
      e.preventDefault();
      const attachmentsIri = parser.parse(attachmentsIriTemplate.value);

      lrs.actions.ontola.showDialog(rdf.namedNode(attachmentsIri.expand({
        page: (sequenceIndex || 0) + 1,
        page_size: 1,
      })));
    }
  };

  const label = caption && caption.value ? caption.value : filename && filename.value;

  return (
    <button className="AttachmentPreview" onClick={handleClick}>
      <Image className="AttachmentPreview__image" linkedProp={thumbnailURL} />
      {label && (
        <h1 className="AttachmentPreview__title" title={label}>
          {label}
        </h1>
      )}
    </button>
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
