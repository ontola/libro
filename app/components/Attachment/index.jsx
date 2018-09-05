import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import { byteToSize } from '../../helpers/numbers';
import LDLink from '../LDLink';

import './Attachment.scss';

const propTypes = {
  /** Link to the file */
  contentUrl: PropTypes.string.isRequired,
  encodingFormat: PropTypes.string,
  /** Filesize in bytes */
  fileSize: PropTypes.string,
  /** Label that is displayed */
  name: PropTypes.string.isRequired,
};

const previewableEncodingFormats = [
  'application/pdf',
];

const Attachment = ({
  name,
  encodingFormat,
  fileSize,
  contentUrl,
}) => (
  <div className="Attachment">
    <LDLink
      className="Attachment__primary"
      title={name}
    >
      <FontAwesome className="Attachment__icon" name="file" />
      <div className="Attachment__text" data-test="Attachment-title">{name}</div>
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
    {previewableEncodingFormats.includes(encodingFormat)
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
