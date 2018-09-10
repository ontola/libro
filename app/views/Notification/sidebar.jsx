import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { sidebarTopology } from '../../topologies/Sidebar';

const NotificationSidebar = () => (
  <Property data-test="Notification-url" label={NS.schema('url')} />
);

export default LinkedRenderStore.registerRenderer(
  NotificationSidebar,
  NS.argu('Notification'),
  RENDER_CLASS_NAME,
  sidebarTopology
);
