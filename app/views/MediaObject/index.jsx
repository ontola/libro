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
  static type = NS.schema('MediaObject');

  static topology = cardListTopology;

  static mapDataToProps = {
    caption: NS.schema('caption'),
    encodingFormat: {
      label: [
        NS.schema('encodingFormat'),
        NS.schema('fileFormat'),
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
      contentUrl: NS.schema('contentUrl'),
      encodingFormat: {
        label: [NS.schema('encodingFormat'), NS.schema('fileFormat')],
      },
      fileSize: NS.schema('fileSize'),
      name: NS.schema('name'),
    }, { returnType: 'value' })(Attachment),
    NS.schema('MediaObject'),
    RENDER_CLASS_NAME,
    [
      cardRowTopology,
      cardTopology,
      cardMainTopology,
    ]
  ),
  register(MediaObjectPreview),
];
