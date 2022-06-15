import { Node } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { Resource, register } from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { cardMainTopology, cardTopology } from '../../../../../topologies';
import CardRow from '../../../../../topologies/Card/CardRow';
import CardContent from '../../../components/Card/CardContent';

interface SuperEventCardProps {
  linkedProp: Node;
}

const SuperEventCard = ({ linkedProp }: SuperEventCardProps): JSX.Element => (
  <CardRow>
    <CardContent>
      <FormattedMessage
        defaultMessage="Discussed in:"
        id="https://app.argu.co/i18n/schema:Thing/schema:superEvent/discussedInLabel"
      />
      <Resource subject={linkedProp} />
    </CardContent>
  </CardRow>
);

SuperEventCard.type = schema.Thing;

SuperEventCard.property = schema.superEvent;

SuperEventCard.topology = [
  cardMainTopology,
  cardTopology,
];

export default register(SuperEventCard);
