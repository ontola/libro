import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useFields,
  useIds,
  useStrings,
} from 'link-redux';
import React from 'react';

import AttachmentPreview from '../../components/AttachmentPreview';
import { imageRepresentationUrl, isPDF } from '../../helpers/attachments';
import dbo from '../../ontology/dbo';
import { listTopology } from '../../topologies/List';

interface PropTypes {
  sequenceIndex: number;
}

const MediaObjectPreview: FC<PropTypes> = ({ sequenceIndex }) => {
  const [caption] = useFields(schema.caption);
  const [contentUrl] = useStrings(schema.contentUrl);
  const [encodingFormat] = useStrings([schema.encodingFormat, schema.fileFormat]);
  const [filename] = useFields(dbo.filename);
  const [isPartOf] = useIds(schema.isPartOf);

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

MediaObjectPreview.topology = [
  listTopology,
];

export default register(MediaObjectPreview);
