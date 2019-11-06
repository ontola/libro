import rdf from '@ontologies/core';
import {
  linkType,
  register,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import {
  Heading,
  Link,
  PDF,
} from '../../components';
import Image from '../../components/Image';
import {
  downloadUrl,
  downloadableAttachment,
  imageRepresentationUrl,
} from '../../helpers/attachments';
import { retrievePath } from '../../helpers/iris';
import { NS } from '../../helpers/LinkedRenderStore';
import { handle } from '../../helpers/logging';
import Container from '../../topologies/Container';
import { pageTopology } from '../../topologies/Page';
import PrimaryResource from '../../topologies/PrimaryResource';

import './MediaObjectPage.scss';

const YOUTUBE_TEST = /^(https:)?\/\/(www.)?youtube.com\/embed\//;

class MediaObjectPage extends React.PureComponent {
  static type = [
    NS.schema('MediaObject'),
    NS.schema('ImageObject'),
    NS.schema('VideoObject'),
  ];

  static topology = pageTopology;

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
    autoPlay: PropTypes.bool,
    caption: linkType,
    contentUrl: linkType,
    embedUrl: linkType,
    encodingFormat: linkType,
    filename: linkType,
    fullPage: PropTypes.bool,
    isPartOf: linkType,
    loop: PropTypes.bool,
    muted: PropTypes.bool,
    playsInline: PropTypes.bool,
    subject: subjectType,
    type: linkType.isRequired,
  };

  headerComponent() {
    const {
      caption,
      filename,
      isPartOf,
    } = this.props;

    const label = caption && caption.value ? caption.value : (filename && filename.value);

    if (!label) {
      handle(new Error(`MediaObject ${this.props.subject} has no label`));
    }

    return (
      <div className="MediaObjectPage__infobar" data-test="MediaObject">
        <Link
          className="MediaObjectPage__infobar--is-part-of"
          data-test="MediaObject-isPartOf"
          title="Back to parent"
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
    );
  }

  viewerComponent() {
    const {
      autoPlay,
      contentUrl,
      encodingFormat,
      embedUrl,
      filename,
      fullPage,
      loop,
      muted,
      playsInline,
      type,
    } = this.props;

    const classes = fullPage ? 'MediaObjectPage--full-page' : '';
    if (rdf.equals(type, NS.schema('VideoObject'))) {
      if (embedUrl && YOUTUBE_TEST.test(embedUrl.value)) {
        return (
          <Container>
            <div className={`MediaObjectPage__infobar--video-container ${classes}`}>
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
            autoPlay={autoPlay}
            className={`MediaObjectPage__infobar--video-html ${classes}`}
            data-test="MediaObject-viewer-video-html"
            loop={loop}
            muted={muted}
            playsInline={playsInline}
            src={contentUrl.value}
          />
        </Container>
      );
      /* eslint-enable jsx-a11y/media-has-caption */
    } else if (encodingFormat.value === 'application/pdf') {
      return (
        <div className={`MediaObjectPage__infobar--pdf ${classes}`}>
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
          ariaLabel={filename && filename.value}
          className={`MediaObjectPage__infobar--image ${classes}`}
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
    const { fullPage } = this.props;

    return (
      <PrimaryResource>
        {!fullPage && this.headerComponent()}
        {this.viewerComponent()}
      </PrimaryResource>
    );
  }
}

export default register(MediaObjectPage);
