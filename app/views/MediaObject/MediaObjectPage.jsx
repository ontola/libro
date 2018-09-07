import { linkType, register } from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';

import { Heading, PDF } from '../../components';
import Container from '../../topologies/Container';
import Image from '../../components/Image';
import {
  downloadableAttachment,
  downloadUrl,
  imageRepresentationUrl,
} from '../../helpers/attachments';
import { retrievePath } from '../../helpers/iris';
import { NS } from '../../helpers/LinkedRenderStore';

import './MediaObjectPage.scss';

const YOUTUBE_TEST = /^(https:)?\/\/(www.)?youtube.com\/embed\//;

class MediaObjectPage extends React.PureComponent {
  static type = [
    NS.schema('MediaObject'),
    NS.schema('ImageObject'),
    NS.schema('VideoObject'),
  ];

  static mapDataToProps = {
    caption: NS.schema('caption'),
    contentUrl: NS.schema('contentUrl'),
    embedUrl: NS.schema('embedUrl'),
    encodingFormat: {
      label: [
        NS.schema('encodingFormat'),
        NS.schema('fileFormat'),
      ],
    },
    filename: NS.dbo('filename'),
    isPartOf: NS.schema('isPartOf'),
    type: NS.rdf('type'),
  };

  static propTypes = {
    caption: linkType,
    contentUrl: linkType,
    embedUrl: linkType,
    encodingFormat: linkType,
    filename: linkType,
    isPartOf: linkType,
    type: linkType,
  };

  viewerComponent() {
    const {
      contentUrl,
      encodingFormat,
      embedUrl,
      filename,
      type,
    } = this.props;

    if (type === NS.schema('VideoObject')) {
      if (embedUrl && YOUTUBE_TEST.test(embedUrl.value)) {
        return (
          <Container>
            <div className="MediaObjectPage__infobar--video-container">
              <iframe
                allowFullScreen
                allow="encrypted-media"
                className="MediaObjectPage__infobar--video-iframe "
                data-test="MediaObject-viewer-video-iframe"
                frameBorder="0"
                src={embedUrl.value}
                title="attachment-inline-video-embed"
              />
            </div>
          </Container>
        );
      }

      /* eslint-disable jsx-a11y/media-has-caption */
      return (
        <Container>
          <video
            className="MediaObjectPage__infobar--video-html"
            data-test="MediaObject-viewer-video-html"
            src={contentUrl.value}
          />
        </Container>
      );
      /* eslint-enable jsx-a11y/media-has-caption */
    } else if (encodingFormat.value === 'application/pdf') {
      return (
        <div className="MediaObjectPage__infobar--pdf">
          <PDF data-test="MediaObject-viewer-pdf" file={contentUrl.value} />
        </div>
      );
    }

    const imageLink = encodingFormat.value.startsWith('image/')
      ? contentUrl
      : imageRepresentationUrl({ encodingFormat });

    return (
      <Container>
        <Image
          className="MediaObjectPage__infobar--image"
          data-test="MediaObject-viewer-image"
          linkedProp={imageLink}
        />
        {filename && <p className="MediaObjectPage__infobar--image--filename">{filename.value}</p>}
      </Container>
    );
  }

  downloadButton() {
    const { contentUrl } = this.props;

    if (downloadableAttachment(this.props)) {
      return null;
    }

    return (
      <a
        className="MediaObjectPage__infobar--download-button"
        data-test="MediaObject-download"
        href={downloadUrl(contentUrl)}
        rel="nofollow noindex"
        title="Downloaden"
      >
        <FontAwesome name="download" />
      </a>
    );
  }

  render() {
    const { caption, filename, isPartOf } = this.props;

    const label = caption && caption.value ? caption.value : filename.value;

    return (
      <React.Fragment>
        <div className="MediaObjectPage__infobar" data-test="MediaObject">
          <Link
            className="MediaObjectPage__infobar--is-part-of"
            data-test="MediaObject-isPartOf"
            to={retrievePath(isPartOf.value)}
          >
            <FontAwesome name="arrow-left" />
          </Link>
          <div className="MediaObjectPage__infobar--label">
            {label && <Heading data-test="MediaObject-heading" variant="light">{label}</Heading>}
          </div>
          <div>
            {this.downloadButton()}
          </div>
        </div>
        {this.viewerComponent()}
      </React.Fragment>
    );
  }
}

export default register(MediaObjectPage);
