import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import { byteToSize } from '../../helpers/numbers';
import LDLink from '../LDLink';

import './Attachment.scss';

const propTypes = {
  /** Link to the file */
  contentUrl: PropTypes.string.isRequired,
  fileFormat: PropTypes.string,
  /** Filesize in bytes */
  fileSize: PropTypes.string,
  /** Label that is displayed */
  title: PropTypes.string.isRequired,
};

const previewableFileFormats = [
  // 'application/pdf',
];

const Attachment = ({
  title,
  fileFormat,
  fileSize,
  contentUrl,
}) => (
  <div className="Attachment">
    <LDLink
      className="Attachment__primary"
      title={title}
    >
      <FontAwesome className="Attachment__icon" name="file" />
      <div className="Attachment__text" data-test="Attachment-title">{title}</div>
    </LDLink>
    <a
      download
      className="Attachment__inside-button"
      data-test="Attachment-download"
      href={contentUrl}
      rel="noopener noreferrer"
      target="_blank"
      title={`Download ${byteToSize(fileSize)}`}
    >
      <FontAwesome className="Attachment__icon" name="download" />
    </a>
    {previewableFileFormats.includes(fileFormat)
      && (
      <a
        className="Attachment__inside-button"
        data-test="Attachment-preview"
        href="/"
        title="Bekijk voorbeeldweergave"
      >
        <FontAwesome className="Attachment__icon" name="caret-right" />
      </a>
      )
    }
  </div>
);

Attachment.propTypes = propTypes;

export default Attachment;
