import schema from '@ontologies/schema';
import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import {
  link,
  linkType,
  register,
} from 'link-redux';
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

class MediaObjectPreview extends React.PureComponent {
  static type = schema.MediaObject;

  static topology = cardListTopology;

  static mapDataToProps = {
    caption: schema.caption,
    encodingFormat: {
      label: [
        schema.encodingFormat,
        schema.fileFormat,
      ],
    },
    filename: NS.dbo('filename'),
  };

  static propTypes = {
    caption: linkType,
    encodingFormat: linkType,
    filename: linkType,
  };

  render() {
    const {
      caption,
      filename,
      encodingFormat,
    } = this.props;

    return (
      <AttachmentPreview
        caption={caption}
        filename={filename}
        thumbnailURL={imageRepresentationUrl({ encodingFormat })}
      />
    );
  }
}

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
