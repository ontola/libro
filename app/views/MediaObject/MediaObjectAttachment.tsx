import * as as from '@ontologies/as';
import { NamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  register,
  useDataFetching,
  useProperty,
  useResourceProperty,
} from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import LDLink from '../../components/LDLink';
import { tryParseInt } from '../../helpers/numbers';
import dbo from '../../ontology/dbo';
import { cardTopology } from '../../topologies/Card';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import { cardRowTopology } from '../../topologies/Card/CardRow';

import './MediaObjectAttachment.scss';

const MediaObjectAttachment = () => {
  const [comment] = useProperty(schema.comment) as NamedNode[];
  const [contentUrl] = useProperty(schema.contentUrl);
  const [name] = useProperty([schema.name, dbo.filename]);

  useDataFetching(comment);
  const totalItems = tryParseInt(useResourceProperty(comment, as.totalItems));

  return (
    <div>
      <div className="Attachment">
        <LDLink
          className="Attachment__primary"
          title={name?.value}
        >
          <FontAwesome
            className="Attachment__icon"
            name="file"
          />
          <div
            className="Attachment__text"
            data-test="Attachment-title"
          >
            {name?.value}
          </div>
        </LDLink>
        <a
          download
          className="Attachment__inside-button"
          data-test="Attachment-download"
          href={contentUrl?.value || ''}
          rel="noopener noreferrer"
          target="_blank"
          title="Downloaden"
        >
          <FontAwesome
            className="Attachment__icon"
            name="download"
          />
        </a>
      </div>
      {' '}
      {totalItems && totalItems > 0 && (
        <span>
          <FontAwesome
            className="Attachment__icon"
            name="comment"
          />
          {totalItems}
        </span>
      )}
    </div>
  );
};

MediaObjectAttachment.type = schema.MediaObject;

MediaObjectAttachment.topology = [
  cardRowTopology,
  cardTopology,
  cardMainTopology,
];

export default register(MediaObjectAttachment);
