import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';

import './Attachment.scss';

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
        className="Attachment__primary"
        href={url}
        rel="noreferrer noopener"
        target="_blank"
        title={title}
      >
        <FontAwesome className="Attachment__icon" name="file" />
        <div className="Attachment__text">{title}</div>
        {(percentageDownloaded !== undefined) &&
          <div className="Attachment__fill" style={fillStyle} />}
      </a>
      {(!isDownloaded && !isDownloading) &&
        <a className="Attachment__inside-button" href="/" title="Wordt gedownload...">
          <FontAwesome className="Attachment__icon" name="download" />
        </a>
      }
      {isDownloading &&
        <a className="Attachment__inside-button" href="/" title="Download bestand">
          <FontAwesome className="Attachment__icon" name="spinner" spin />
        </a>
      }
      {hasPreview &&
        <a className="Attachment__inside-button" href="/" title="Bekijk voorbeeldweergave">
          <FontAwesome className="Attachment__icon" name="search-plus" />
        </a>
      }
    </div>
  );
};

Attachment.defaultProps = defaultProps;
Attachment.propTypes = propTypes;

export default Attachment;
