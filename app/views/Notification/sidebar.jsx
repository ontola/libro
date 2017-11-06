import { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

import LinkedRenderStore, { NS } from '../../helpers/LinkedRenderStore';

const NotificationSidebar = () => (
  <Property label={NS.schema('url')} />
);

LinkedRenderStore.registerRenderer(
  NotificationSidebar,
  NS.argu('Notification'),
  RENDER_CLASS_NAME,
  NS.argu('sidebar')
);

export default NotificationSidebar;
