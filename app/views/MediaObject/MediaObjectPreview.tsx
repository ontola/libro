import { Literal, NamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import AttachmentPreview from '../../components/AttachmentPreview';
import { imageRepresentationUrl, isPDF } from '../../helpers/attachments';
import dbo from '../../ontology/dbo';
import { cardListTopology } from '../../topologies/Card/CardList';

interface PropTypes {
  sequenceIndex: number;
}

const MediaObjectPreview: FC<PropTypes> = ({ sequenceIndex }) => {
  const [caption] = useProperty(schema.caption);
  const [contentUrl] = useProperty(schema.contentUrl) as NamedNode[];
  const [encodingFormat] = useProperty([schema.encodingFormat, schema.fileFormat]) as Literal[];
  const [filename] = useProperty(dbo.filename);
  const [isPartOf] = useProperty(schema.isPartOf) as SomeNode[];

  return (
    <AttachmentPreview
      isDocument
      caption={caption}
      contentUrl={contentUrl}
      filename={filename}
      isPartOf={isPartOf}
      sequenceIndex={sequenceIndex}
      showPreviewDialog={isPDF(encodingFormat, contentUrl)}
      thumbnailURL={imageRepresentationUrl({ encodingFormat })}
    />
  );
};

MediaObjectPreview.type = schema.MediaObject;

MediaObjectPreview.topology = cardListTopology;

export default register(MediaObjectPreview);
