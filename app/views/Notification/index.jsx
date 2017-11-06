import { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

import {
  Card,
  CardContent,
} from '../../components';
import LinkedRenderStore, { NS } from '../../helpers/LinkedRenderStore';

const Notification = () => (
  <Card>
    <CardContent>
      <Property label={NS.schema('target')}>
        <Property label={NS.schema('creator')} />
        <div style={{ width: '100%' }}>
          <Property label={NS.schema('name')} />
          <Property label={NS.schema('dateCreated')} style={{ display: 'block' }} />
        </div>
        <Property label={NS.argu('unread')} />
      </Property>
    </CardContent>
  </Card>
);

[undefined, NS.argu('collection')].forEach((top) => {
  LinkedRenderStore.registerRenderer(
    Notification,
    NS.argu('Notification'),
    RENDER_CLASS_NAME,
    top
  );
});

export { default as Sidebar } from './sidebar';
export { default as Creator } from './properties/creator';
export { default as Target } from './properties/target';
export { default as Unread } from './properties/unread';

export default Notification;
