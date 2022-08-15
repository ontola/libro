import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useLiterals,
  useProperty,
} from 'link-redux';
import React from 'react';

import dbo from '../../../Common/ontology/dbo';
import { DocumentAttachmentPreview } from '../../../Common/components/AttachmentPreview/DocumentAttachmentPreview';
import { imageRepresentationUrl } from '../../../Common/lib/attachments';
import { chapterContentTopology } from '../../topologies';

const emptyClickHandler = () => null;

const MediaObjectChapterContent: FC = () => {
  const [caption] = useProperty(schema.caption);
  const [contentUrl] = useProperty(schema.contentUrl);
  const [encodingFormat] = useLiterals(schema.encodingFormat);
  const [filename] = useProperty(dbo.filename);

  return (
    <DocumentAttachmentPreview
      downloadURL={contentUrl.value}
      label={caption?.value ?? filename?.value}
      showPreviewDialog={false}
      thumbnailURL={imageRepresentationUrl({ encodingFormat })}
      onPreviewClick={emptyClickHandler}
    />
  );
};

MediaObjectChapterContent.type = schema.MediaObject;

MediaObjectChapterContent.topology = chapterContentTopology;

export default register(MediaObjectChapterContent);
