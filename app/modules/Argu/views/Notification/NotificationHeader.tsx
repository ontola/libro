import * as schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import { navbarTopology } from '../../../../topologies';

const NotificationHeader = () => (
  <Property
    data-test="Notification-url"
    label={schema.url}
  />
);

NotificationHeader.type = argu.Notification;

NotificationHeader.topology = navbarTopology;

export default register(NotificationHeader);

