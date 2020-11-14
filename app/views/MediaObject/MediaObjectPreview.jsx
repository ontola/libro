import schema from '@ontologies/schema';
import { linkType, register } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import AttachmentPreview from '../../components/AttachmentPreview';
import { imageRepresentationUrl } from '../../helpers/attachments';
import dbo from '../../ontology/dbo';
import { cardListTopology } from '../../topologies/Card/CardList';

const MediaObjectPreview = ({
  caption,
  contentUrl,
  filename,
  encodingFormat,
  isPartOf,
  sequenceIndex,
}) => (
  <AttachmentPreview
    caption={caption}
    contentUrl={contentUrl}
    filename={filename}
    isPartOf={isPartOf}
    sequenceIndex={sequenceIndex}
    thumbnailURL={imageRepresentationUrl({ encodingFormat })}
  />
);

MediaObjectPreview.type = schema.MediaObject;

MediaObjectPreview.topology = cardListTopology;

MediaObjectPreview.mapDataToProps = {
  caption: schema.caption,
  contentUrl: schema.contentUrl,
  encodingFormat: {
    label: [
      schema.encodingFormat,
      schema.fileFormat,
    ],
  },
  filename: dbo.filename,
  isPartOf: schema.isPartOf,
};

MediaObjectPreview.propTypes = {
  caption: linkType,
  contentUrl: linkType,
  encodingFormat: linkType,
  filename: linkType,
  isPartOf: linkType,
  sequenceIndex: PropTypes.number,
};

export default register(MediaObjectPreview);
