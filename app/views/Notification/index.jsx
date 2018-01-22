import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

import {
  Card,
  CardContent,
} from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';

import Sidebar from './sidebar';
import Creator from './properties/creator';
import Name from './properties/name';
import ReadAction from './properties/readAction';
import Target from './properties/target';
import Unread from './properties/unread';

const Notification = () => (
  <div data-test="Notification-notification" style={{ position: 'relative' }}>
    <Card>
      <Property label={NS.argu('unread')} />
      <CardContent>
        <Property label={NS.schema('target')}>
          <Property label={NS.schema('creator')} />
          <div style={{ width: '100%' }}>
            <Property label={NS.schema('name')} />
            <Property label={NS.schema('dateCreated')} style={{ display: 'block' }} />
          </div>
        </Property>
      </CardContent>
    </Card>
  </div>
);

export default [
  LinkedRenderStore.registerRenderer(
    Notification,
    NS.argu('Notification'),
    RENDER_CLASS_NAME,
    [undefined, NS.argu('collection')]
  ),
  Sidebar,
  Creator,
  Name,
  ReadAction,
  Target,
  Unread,
];
