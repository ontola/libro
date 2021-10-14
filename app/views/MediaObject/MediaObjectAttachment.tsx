import * as as from '@ontologies/as';
import * as schema from '@ontologies/schema';
import {
  register,
  useDataFetching,
  useIds,
  useValues,
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
  const [comment] = useIds(schema.comment);
  const [contentUrl] = useValues(schema.contentUrl);
  const [name] = useValues([schema.name, dbo.filename]);

  useDataFetching(comment);
  const totalItems = tryParseInt(useValues(comment, as.totalItems));

  return (
    <div>
      <div className="Attachment">
        <LDLink
          className="Attachment__primary"
          title={name}
        >
          <FontAwesome
            className="Attachment__icon"
            name="file"
          />
          <div
            className="Attachment__text"
            data-test="Attachment-title"
          >
            {name}
          </div>
        </LDLink>
        <a
          download
          className="Attachment__inside-button"
          data-test="Attachment-download"
          href={contentUrl ?? ''}
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
