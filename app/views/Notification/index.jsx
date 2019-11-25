import schema from '@ontologies/schema';
import {
  Property,
  linkType,
  lrsType,
  register,
  subjectType,
} from 'link-redux';
import React from 'react';

import { CardContent } from '../../components';
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

const Notification = ({
  lrs,
  subject,
  target,
}) => {
  let content = <Property label={schema.name} />;
  if (target) {
    const readAction = lrs.findSubject(subject, actionType, schema.ReadAction).pop();

    content = (
      <Property label={schema.target} onClick={() => readAction && lrs.exec(readAction)}>
        <Property label={schema.creator} />
        <div style={{ width: '100%' }}>
          <Property label={schema.name} />
          <Property label={schema.dateCreated} style={{ display: 'block' }} />
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

Notification.type = NS.argu('Notification');

Notification.topology = [
  primaryResourceTopology,
  containerTopology,
];

Notification.mapDataToProps = {
  name: schema.name,
  target: schema.target,
};

Notification.propTypes = propTypes;

export default [
  register(Notification),
  NotificationHeader,
  Creator,
  Name,
  Target,
  Unread,
];
