import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useIds,
  useProperty,
} from 'link-redux';
import React from 'react';

import dbo from '../../../../ontology/dbo';
import { listTopology } from '../../../../topologies';
import AttachmentPreview from '../../components/AttachmentPreview';

interface ImageObjectList {
  sequenceIndex: number;
}

const ImageObjectList: FC<ImageObjectList> = ({
  sequenceIndex,
}) => {
  const [caption] = useProperty(schema.caption);
  const [contentUrl] = useIds(schema.contentUrl);
  const [filename] = useProperty(dbo.filename);
  const [isPartOf] = useIds(schema.isPartOf);
  const [thumbnailUrl] = useIds(schema.thumbnail);

  return (
    <AttachmentPreview
      caption={caption}
      filename={filename}
      isPartOf={isPartOf}
      sequenceIndex={sequenceIndex}
      thumbnailURL={thumbnailUrl || contentUrl}
    />
  );
};

ImageObjectList.type = [schema.ImageObject, schema.VideoObject];

ImageObjectList.topology = listTopology;

export default register(ImageObjectList);
