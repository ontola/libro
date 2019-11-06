import schema from '@ontologies/schema';
import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import {
  link,
  linkType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { Attachment } from '../../components';
import AttachmentPreview from '../../components/AttachmentPreview';
import { imageRepresentationUrl } from '../../helpers/attachments';
import { NS } from '../../helpers/LinkedRenderStore';
import { cardTopology } from '../../topologies/Card';
import { cardListTopology } from '../../topologies/Card/CardList';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import { cardRowTopology } from '../../topologies/Card/CardRow';

import MediaObjectOmniformFields from './MediaObjectOmniformFields';
import MediaObjectPage from './MediaObjectPage';

const MediaObjectPreview = ({
  caption,
  filename,
  encodingFormat,
  isPartOf,
  sequenceIndex,
}) => (
  <AttachmentPreview
    caption={caption}
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
  encodingFormat: {
    label: [
      schema.encodingFormat,
      schema.fileFormat,
    ],
  },
  filename: NS.dbo('filename'),
  isPartOf: schema.isPartOf,
};

MediaObjectPreview.propTypes = {
  caption: linkType,
  encodingFormat: linkType,
  filename: linkType,
  isPartOf: linkType,
  sequenceIndex: PropTypes.number,
};


export default [
  MediaObjectOmniformFields,
  MediaObjectPage,
  LinkedRenderStore.registerRenderer(
    link({
      contentUrl: schema.contentUrl,
      encodingFormat: {
        label: [schema.encodingFormat, schema.fileFormat],
      },
      fileSize: schema.fileSize,
      name: schema.name,
    }, { returnType: 'value' })(Attachment),
    schema.MediaObject,
    RENDER_CLASS_NAME,
    [
      cardRowTopology,
      cardTopology,
      cardMainTopology,
    ]
  ),
  register(MediaObjectPreview),
];
