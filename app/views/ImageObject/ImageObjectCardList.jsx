import { linkType, register } from 'link-redux';
import React from 'react';

import AttachmentPreview from '../../components/AttachmentPreview';
import { NS } from '../../helpers/LinkedRenderStore';
import { cardListTopology } from '../../topologies/Card/CardList';

class ImageObjectCardList extends React.PureComponent {
  static type = [NS.schema('ImageObject'), NS.schema('VideoObject')];

  static topology = cardListTopology;

  static mapDataToProps = {
    caption: NS.schema('caption'),
    filename: NS.dbo('filename'),
    thumbnailURL: NS.schema('thumbnail'),
  };

  static propTypes = {
    caption: linkType,
    filename: linkType,
    thumbnailURL: linkType,
  };

  render() {
    const {
      caption,
      filename,
      thumbnailURL,
    } = this.props;

    return (
      <AttachmentPreview
        caption={caption}
        filename={filename}
        thumbnailURL={thumbnailURL}
      />
    );
  }
}

export default register(ImageObjectCardList);
