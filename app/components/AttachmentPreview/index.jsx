import rdf from '@ontologies/core';
import { linkType, useLRS } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import parser from 'uri-template';

import Image from '../Image/index';
import { entityIsLoaded } from '../../helpers/data';
import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';

import './AttachmentPreview.scss';

const AttachmentPreview = ({
  caption,
  filename,
  isPartOf,
  sequenceIndex,
  thumbnailURL,
}) => {
  const lrs = useLRS();
  if (__CLIENT__ && isPartOf && !entityIsLoaded(lrs, isPartOf)) {
    lrs.queueEntity(isPartOf);
  }
  const attachments = lrs.getResourceProperty(isPartOf, argu.attachments);
  if (__CLIENT__ && attachments && !entityIsLoaded(lrs, attachments)) {
    lrs.queueEntity(attachments);
  }

  const openModal = (e) => {
    e.preventDefault();
    const attachmentsIri = parser.parse(
      lrs.getResourceProperty(attachments, ontola.iriTemplate).value
    );

    lrs.actions.ontola.showDialog(rdf.namedNode(attachmentsIri.expand({
      page: (sequenceIndex || 0) + 1,
      page_size: 1,
    })));
  };

  const label = caption && caption.value ? caption.value : filename && filename.value;

  return (
    <button className="AttachmentPreview" onClick={openModal}>
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
  filename: linkType.isRequired,
  isPartOf: linkType,
  sequenceIndex: PropTypes.number,
  thumbnailURL: linkType,
};


export default AttachmentPreview;
