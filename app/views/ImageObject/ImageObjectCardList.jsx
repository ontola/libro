import schema from '@ontologies/schema';
import { linkType, register } from 'link-redux';
import React from 'react';

import AttachmentPreview from '../../components/AttachmentPreview';
import { NS } from '../../helpers/LinkedRenderStore';
import { cardListTopology } from '../../topologies/Card/CardList';

class ImageObjectCardList extends React.PureComponent {
  static type = [schema.ImageObject, schema.VideoObject];

  static topology = cardListTopology;

  static mapDataToProps = {
    caption: schema.caption,
    contentUrl: schema.contentUrl,
    filename: NS.dbo('filename'),
    thumbnailUrl: schema.thumbnail,
  };

  static propTypes = {
    caption: linkType,
    contentUrl: linkType,
    filename: linkType,
    thumbnailUrl: linkType,
  };

  render() {
    const {
      caption,
      contentUrl,
      filename,
      thumbnailUrl,
    } = this.props;

    return (
      <AttachmentPreview
        caption={caption}
        filename={filename}
        thumbnailURL={thumbnailUrl || contentUrl}
      />
    );
  }
}

export default register(ImageObjectCardList);
