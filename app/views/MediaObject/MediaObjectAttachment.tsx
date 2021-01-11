import as from '@ontologies/as';
import { Literal } from '@ontologies/core';
import schema from '@ontologies/schema';
import { NamedNode } from 'link-lib/dist-types/rdf';
import {
  FC,
  register,
  useDataFetching,
  useResourceProperty,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import LDLink from '../../components/LDLink';
import { tryParseInt } from '../../helpers/numbers';
import dbo from '../../ontology/dbo';
import { cardTopology } from '../../topologies/Card';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import { cardRowTopology } from '../../topologies/Card/CardRow';

import './MediaObjectAttachment.scss';

interface PropTypes {
  comment: NamedNode;
  /** Link to the file */
  contentUrl: NamedNode;
  /** Label that is displayed */
  name: Literal;
}

const MediaObjectAttachment: FC<PropTypes> = ({
  name,
  comment,
  contentUrl,
}) => {
  useDataFetching(comment);
  const totalItems = tryParseInt(useResourceProperty(comment, as.totalItems));

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
          title="Downloaden"
        >
          <FontAwesome className="Attachment__icon" name="download" />
        </a>
      </div>
      {' '}
      {totalItems && totalItems > 0 && (
        <span>
          <FontAwesome className="Attachment__icon" name="comment" />
          {totalItems}
        </span>
      )}
    </div>
  );
};

MediaObjectAttachment.type = schema.MediaObject;

MediaObjectAttachment.mapDataToProps = {
  comment: schema.comment,
  contentUrl: schema.contentUrl,
  name: [schema.name, dbo.filename],
};

MediaObjectAttachment.topology = [
  cardRowTopology,
  cardTopology,
  cardMainTopology,
];

export default register(MediaObjectAttachment);
