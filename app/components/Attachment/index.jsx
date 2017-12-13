import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import './Attachment.scss';

const propTypes = {
  /** If the file can be previewed without downloading */
  hasPreview: PropTypes.bool,
  isDownloaded: PropTypes.bool,
  isDownloading: PropTypes.bool,
  /** Value between 0 and 100 */
  percentageDownloaded: PropTypes.number,
  /** Label that is displayed */
  title: PropTypes.string.isRequired,
  /** Link to the file */
  url: PropTypes.string.isRequired,
};

const defaultProps = {
  hasPreview: false,
  isDownloaded: false,
  isDownloading: false,
  percentageDownloaded: 0,
};

const Attachment = ({
  title,
  hasPreview,
  isDownloaded,
  isDownloading,
  percentageDownloaded,
  url,
}) => {
  const fillStyle = {
    width: `${percentageDownloaded}%`,
  };

  return (
    <div className="Attachment" href={url}>
      <a
        className="Attachment__primary"
        href={url}
        rel="noreferrer noopener"
        target="_blank"
        title={title}
      >
        <FontAwesome className="Attachment__icon" name="file" />
        <div className="Attachment__text" data-test="Attachment-title">{title}</div>
        {(percentageDownloaded !== undefined) &&
          <div className="Attachment__fill" data-test="Attachment-progress" style={fillStyle} />}
      </a>
      {(!isDownloaded && !isDownloading) &&
        <a
          className="Attachment__inside-button"
          data-test="Attachment-download"
          href="/"
          title="Download bestand"
        >
          <FontAwesome className="Attachment__icon" name="download" />
        </a>
      }
      {isDownloading &&
        <a
          className="Attachment__inside-button"
          data-test="Attachment-downloading"
          href="/"
          title="Wordt gedownload..."
        >
          <FontAwesome spin className="Attachment__icon" name="spinner" />
        </a>
      }
      {hasPreview &&
        <a
          className="Attachment__inside-button"
          data-test="Attachment-preview"
          href="/"
          title="Bekijk voorbeeldweergave"
        >
          <FontAwesome className="Attachment__icon" name="search-plus" />
        </a>
      }
    </div>
  );
};

Attachment.defaultProps = defaultProps;
Attachment.propTypes = propTypes;

export default Attachment;
