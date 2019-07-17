import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import {
  Property,
  link,
  linkType,
  lrsType,
  subjectType,
} from 'link-redux';
import React from 'react';

import {
  CardContent,
} from '../../components';
import { actionType } from '../../helpers/diggers';
import { NS } from '../../helpers/LinkedRenderStore';
import Card from '../../topologies/Card';
import { containerTopology } from '../../topologies/Container';
import { primaryResourceTopology } from '../../topologies/PrimaryResource';

import NotificationHeader from './NotificationHeader';
import Creator from './properties/creator';
import Name from './properties/name';
import Target from './properties/target';
import Unread from './properties/unread';

const propTypes = {
  lrs: lrsType,
  subject: subjectType,
  target: linkType,
};

const Notification = ({ lrs, subject, target }) => {
  let content = <Property label={NS.schema('name')} />;
  if (target) {
    const readAction = lrs.findSubject(subject, actionType, NS.schema('ReadAction')).pop();

    content = (
      <Property label={NS.schema('target')} onClick={() => readAction && lrs.exec(readAction)}>
        <Property label={NS.schema('creator')} />
        <div style={{ width: '100%' }}>
          <Property label={NS.schema('name')} />
          <Property label={NS.schema('dateCreated')} style={{ display: 'block' }} />
        </div>
      </Property>
    );
  }

  return (
    <div data-test="Notification-notification" style={{ position: 'relative' }}>
      <Card>
        <Property label={NS.argu('unread')} />
        <CardContent>
          {content}
        </CardContent>
      </Card>
    </div>
  );
};

Notification.propTypes = propTypes;

export default [
  LinkedRenderStore.registerRenderer(
    link([NS.schema('name'), NS.schema('target')])(Notification),
    NS.argu('Notification'),
    RENDER_CLASS_NAME,
    [
      primaryResourceTopology,
      containerTopology,
    ]
  ),
  NotificationHeader,
  Creator,
  Name,
  Target,
  Unread,
];
