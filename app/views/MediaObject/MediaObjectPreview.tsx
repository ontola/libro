import { Literal, NamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import { FC, register } from 'link-redux';
import React from 'react';

import AttachmentPreview from '../../components/AttachmentPreview';
import { imageRepresentationUrl, isPDF } from '../../helpers/attachments';
import dbo from '../../ontology/dbo';
import { cardListTopology } from '../../topologies/Card/CardList';

interface PropTypes {
  caption: Literal;
  contentUrl: NamedNode;
  encodingFormat: Literal;
  filename: Literal;
  isPartOf: SomeNode;
  sequenceIndex: number;
}

const MediaObjectPreview: FC<PropTypes> = ({
  caption,
  contentUrl,
  filename,
  encodingFormat,
  isPartOf,
  sequenceIndex,
}) => (
  <AttachmentPreview
    isDocument
    caption={caption}
    contentUrl={contentUrl}
    filename={filename}
    isPartOf={isPartOf}
    sequenceIndex={sequenceIndex}
    showPreviewDialog={isPDF(encodingFormat)}
    thumbnailURL={imageRepresentationUrl({ encodingFormat })}
  />
);

MediaObjectPreview.type = schema.MediaObject;

MediaObjectPreview.topology = cardListTopology;

MediaObjectPreview.mapDataToProps = {
  caption: schema.caption,
  contentUrl: schema.contentUrl,
  encodingFormat: [
    schema.encodingFormat,
    schema.fileFormat,
  ],
  filename: dbo.filename,
  isPartOf: schema.isPartOf,
};

export default register(MediaObjectPreview);
