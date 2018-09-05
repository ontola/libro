import { linkType } from 'link-redux';
import React from 'react';

import { Image } from '../../components';
import LDLink from '../LDLink';

import './AttachmentPreview.scss';

class AttachmentPreview extends React.PureComponent {
  static propTypes = {
    caption: linkType,
    filename: linkType.isRequired,
    thumbnailURL: linkType,
  };

  render() {
    const {
      caption,
      filename,
      thumbnailURL,
    } = this.props;

    const label = caption && caption.value ? caption.value : filename && filename.value;

    return (
      <div className="AttachmentPreview">
        <LDLink className="none">
          <Image className="AttachmentPreview__image" linkedProp={thumbnailURL} />
          {label && (
            <h1 className="AttachmentPreview__title" title={label}>
              {label}
            </h1>
          )}
        </LDLink>
      </div>
    );
  }
}

export default AttachmentPreview;
