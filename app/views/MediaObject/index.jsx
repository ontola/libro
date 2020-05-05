import schema from '@ontologies/schema';
import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import {
  ReturnType,
  link,
  linkType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import Attachment from '../../components/Attachment';
import AttachmentPreview from '../../components/AttachmentPreview';
import { imageRepresentationUrl } from '../../helpers/attachments';
import dbo from '../../ontology/dbo';
import { cardTopology } from '../../topologies/Card';
import { cardListTopology } from '../../topologies/Card/CardList';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import { cardRowTopology } from '../../topologies/Card/CardRow';

import MediaObjectPage from './MediaObjectFull';

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


export default [
  MediaObjectPage,
  LinkedRenderStore.registerRenderer(
    link({
      contentUrl: schema.contentUrl,
      encodingFormat: {
        label: [schema.encodingFormat, schema.fileFormat],
      },
      fileSize: schema.fileSize,
      name: schema.name,
    }, { returnType: ReturnType.Value })(Attachment),
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
