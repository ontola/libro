import * as schema from '@ontologies/schema';
import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import { navbarTopology } from '../../topologies/Navbar';

const NotificationHeader = () => (
  <Property data-test="Notification-url" label={schema.url} />
);

export default LinkedRenderStore.registerRenderer(
  NotificationHeader,
  argu.Notification,
  RENDER_CLASS_NAME,
  navbarTopology
);
