// @flow
import './Attachment.scss';
import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';

const propTypes = {
  /** Label that is displayed */
  title: PropTypes.string.isRequired,
  /** Link to the file */
  url: PropTypes.string.isRequired,
  /** Value between 0 and 100 */
  percentageDownloaded: PropTypes.number,
  /** If the file can be previewed without downloading */
  hasPreview: PropTypes.bool,
  isDownloaded: PropTypes.bool,
  isDownloading: PropTypes.bool,
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
        href={url}
        className="Attachment__primary"
        target="_blank"
        rel="noreferrer noopener"
        title={title}
      >
        <FontAwesome className="Attachment__icon" name="file" />
        <div className="Attachment__text">{title}</div>
        {(percentageDownloaded !== undefined) &&
          <div className="Attachment__fill" style={fillStyle} />}
      </a>
      {(!isDownloaded && !isDownloading) &&
        <a href="/" className="Attachment__inside-button" title="Wordt gedownload...">
          <FontAwesome className="Attachment__icon" name="download" />
        </a>
      }
      {isDownloading &&
        <a href="/" className="Attachment__inside-button" title="Download bestand">
          <FontAwesome className="Attachment__icon" name="spinner" spin />
        </a>
      }
      {hasPreview &&
        <a href="/" className="Attachment__inside-button" title="Bekijk voorbeeldweergave">
          <FontAwesome className="Attachment__icon" name="search-plus" />
        </a>
      }
    </div>
  );
};

Attachment.defaultProps = defaultProps;
Attachment.propTypes = propTypes;

export default Attachment;
