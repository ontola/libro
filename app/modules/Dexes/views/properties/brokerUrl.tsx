import * as schema from '@ontologies/schema';
import {
  FC,
  PropertyProps,
  register,
} from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Button from '../../../Common/components/Button';
import { cardTopology } from '../../../Common/topologies/Card';
import { cardFixedTopology } from '../../../Common/topologies/Card/CardFixed';
import { cardMainTopology } from '../../../Common/topologies/Card/CardMain';
import dexes from '../../ontology/dexes';
import { messages } from '../messages';

const BrokerUrl: FC<PropertyProps> = ({
  linkedProp,
}) => (
  <div>
    <Button
      href={linkedProp.value}
      icon="external-link"
    >
      <FormattedMessage {...messages.showInBroker} />
    </Button>
  </div>
);

BrokerUrl.type = schema.Thing;

BrokerUrl.property = dexes.brokerUrl;

BrokerUrl.topology = [
  cardFixedTopology,
  cardMainTopology,
  cardTopology,
];

export default register(BrokerUrl);
