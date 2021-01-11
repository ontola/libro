import dcterms from '@ontologies/dcterms';
import rdfx from '@ontologies/rdf';
import schema from '@ontologies/schema';
import {
  ReturnType,
  linkType,
  register,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import Heading from '../../components/Heading';
import Image from '../../components/Image';
import LDLink from '../../components/LDLink';
import Link from '../../components/Link';
import PDFViewer from '../../containers/PDFViewer';
import {
  downloadUrl,
  downloadableAttachment,
  imageRepresentationUrl,
} from '../../helpers/attachments';
import { handle } from '../../helpers/logging';
import dbo from '../../ontology/dbo';
import Container, { containerTopology } from '../../topologies/Container';
import { fullResourceTopology } from '../../topologies/FullResource';

import './MediaObjectPage.scss';

const YOUTUBE_TEST = /^(https:)?\/\/(www.)?youtube.com\/embed\//;

const isPDF = (encodingFormat, contentUrl) => (
  encodingFormat?.value === 'application/pdf'
    || contentUrl.value.includes('api.openraadsinformatie.nl')
);

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
    isPartOf: {
      label: [
        schema.isPartOf,
        dcterms.isReferencedBy,
      ],
    },
    name: schema.name,
    type: {
      label: rdfx.type,
      returnType: ReturnType.AllTerms,
    },
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
    name: linkType,
    playsInline: PropTypes.bool,
    subject: subjectType,
    type: linkType.isRequired,
  };

  headerComponent() {
    const {
      caption,
      filename,
      name,
      isPartOf,
    } = this.props;

    const label = caption?.value || filename?.value || name?.value;

    if (!isPartOf) {
      return null;
    }

    if (!label) {
      handle(new Error(`MediaObject ${this.props.subject} has no label`));
    }

    return (
      <div className="MediaObjectPage__infobar" data-test="MediaObject">
        {isPartOf && (
          <Link
            className="MediaObjectPage__infobar--is-part-of"
            data-test="MediaObject-isPartOf"
            style={{ alignItems: 'center' }}
            title="Back to parent"
            to={isPartOf.value}
          >
            <FontAwesome name="arrow-left" />
          </Link>
        )}
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
    if (type.includes(schema.VideoObject)) {
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

    if (isPDF(encodingFormat, contentUrl)) {
      return (
        <Container>
          <PDFViewer subject={this.props.subject} url={contentUrl.value} />
        </Container>
      );
    }

    const imageLink = encodingFormat?.value?.startsWith('image/')
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
