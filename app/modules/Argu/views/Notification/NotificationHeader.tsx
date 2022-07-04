import * as schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import { navbarTopology } from '../../../NavBar/topologies/Navbar';
import argu from '../../ontology/argu';

const NotificationHeader = () => (
  <Property
    data-test="Notification-url"
    label={schema.url}
  />
);

NotificationHeader.type = argu.Notification;

NotificationHeader.topology = navbarTopology;

export default register(NotificationHeader);

