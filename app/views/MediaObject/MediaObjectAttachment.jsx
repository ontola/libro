import as from '@ontologies/as';
import schema from '@ontologies/schema';
import { linkType, register, useDataFetching, useDataInvalidation, useLRS } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import { byteToSize, tryParseInt } from '../../helpers/numbers';
import LDLink from '../../components/LDLink';
import { cardTopology } from '../../topologies/Card';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import { cardRowTopology } from '../../topologies/Card/CardRow';

import './MediaObjectAttachment.scss';

const propTypes = {
  /** Link to the file */
  contentUrl: PropTypes.string.isRequired,
  /** Filesize in bytes */
  fileSize: PropTypes.string,
  /** Label that is displayed */
  name: PropTypes.string.isRequired,
  comment: linkType,
};

const MediaObjectAttachment = ({
  name,
  fileSize,
  comment,
  contentUrl,
}) => {
  const lrs = useLRS();
  useDataFetching(comment);
  const totalItems = lrs.getResourceProperty(comment, as.totalItems);

  return (
    <div>
      <div className="Attachment">
        <LDLink
          className="Attachment__primary"
          title={name?.value}
        >
          <FontAwesome className="Attachment__icon" name="file" />
          <div className="Attachment__text" data-test="Attachment-title">{name?.value}</div>
        </LDLink>
        <a
          download
          className="Attachment__inside-button"
          data-test="Attachment-download"
          href={contentUrl?.value}
          rel="noopener noreferrer"
          target="_blank"
          title={`Download ${byteToSize(fileSize?.value)}`}
        >
          <FontAwesome className="Attachment__icon" name="download" />
        </a>
      </div>
      {' '}
      {totalItems && tryParseInt(totalItems) > 0 && (
        <span>
          <FontAwesome className="Attachment__icon" name="comment" />
          {tryParseInt(totalItems)}
        </span>
      )}
    </div>
  );
};

MediaObjectAttachment.type = schema.MediaObject;

MediaObjectAttachment.propTypes = propTypes;

MediaObjectAttachment.mapDataToProps = {
  comment: schema.comment,
  contentUrl: schema.contentUrl,
  encodingFormat: {
    label: [schema.encodingFormat, schema.fileFormat],
  },
  fileSize: schema.fileSize,
  name: schema.name,
};

MediaObjectAttachment.topology = [
  cardRowTopology,
  cardTopology,
  cardMainTopology,
];

export default register(MediaObjectAttachment);
