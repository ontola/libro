import * as schema from '@ontologies/schema';
import LinkedRenderStore from 'link-lib';
import { Resource, linkedPropType } from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import CardContent from '../../../components/Card/CardContent';
import { cardTopology } from '../../../topologies/Card';
import { cardMainTopology } from '../../../topologies/Card/CardMain';
import CardRow from '../../../topologies/Card/CardRow';

const propTypes = {
  linkedProp: linkedPropType,
};

const superEventCard = ({ linkedProp }) => (
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

superEventCard.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  superEventCard,
  schema.Thing,
  schema.superEvent,
  [
    cardMainTopology,
    cardTopology,
  ]
);
