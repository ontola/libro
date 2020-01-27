import rdf from '@ontologies/core';
import rdfx from '@ontologies/rdf';
import schema from '@ontologies/schema';
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
} from '../../components';
import Image from '../../components/Image';
import LDLink from '../../components/LDLink';
import {
  downloadUrl,
  downloadableAttachment,
  imageRepresentationUrl,
} from '../../helpers/attachments';
import { retrievePath } from '../../helpers/iris';
import { handle } from '../../helpers/logging';
import dbo from '../../ontology/dbo';
import Container, { containerTopology } from '../../topologies/Container';
import { fullResourceTopology } from '../../topologies/FullResource';

import './MediaObjectPage.scss';

const YOUTUBE_TEST = /^(https:)?\/\/(www.)?youtube.com\/embed\//;

class MediaObjectFull extends React.PureComponent {
  static type = [
    schema.MediaObject,
    schema.ImageObject,
    schema.VideoObject,
  ];

  static topology = [fullResourceTopology, containerTopology];

  static mapDataToProps = {
    caption: schema.caption,
    contentUrl: schema.contentUrl,
    embedUrl: schema.embedUrl,
    encodingFormat: {
      label: [
        schema.encodingFormat,
        schema.fileFormat,
      ],
    },
    filename: dbo.filename,
    isPartOf: schema.isPartOf,
    type: rdfx.type,
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
        {this.viewResourceButton()}
        {this.downloadButton()}
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
    if (rdf.equals(type, schema.VideoObject)) {
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

  viewResourceButton() {
    const { subject } = this.props;

    if (typeof window !== 'undefined' && window.location.href === subject.value) {
      return undefined;
    }

    return (
      <LDLink
        className="MediaObjectPage__infobar--download-button"
        href={subject.value}
        title="Bekijken"
      >
        <FontAwesome name="eye" />
      </LDLink>
    );
  }

  render() {
    const { fullPage } = this.props;

    return (
      <React.Fragment>
        {!fullPage && this.headerComponent()}
        {this.viewerComponent()}
      </React.Fragment>
    );
  }
}

export default register(MediaObjectFull);
