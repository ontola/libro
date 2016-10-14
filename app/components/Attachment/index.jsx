// @flow
import './Attachment.scss';
import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';

const propTypes = {
  /** Label that is displayed */
  title: PropTypes.string.isRequired,
  /** Link to the file */
  url: PropTypes.string.isRequired,
  percentageDownloaded: PropTypes.number,
  hasPreview: PropTypes.bool,
  isDownloaded: PropTypes.bool,
  isDownloading: PropTypes.bool,
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
        {percentageDownloaded && <div className="Attachment__fill" style={fillStyle} />}
      </a>
      {(!isDownloaded && !isDownloading) &&
        <a href="/" className="Attachment__inside-button" title="Download bestand">
          <FontAwesome className="Attachment__icon" name="download" />
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

Attachment.propTypes = propTypes;

export default Attachment;
