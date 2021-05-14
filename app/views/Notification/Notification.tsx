import { NamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useLRS,
} from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import Card from '../../topologies/Card';
import { containerTopology } from '../../topologies/Container';
import { fullResourceTopology } from '../../topologies/FullResource';

interface NotificationProps {
  readAction?: NamedNode;
  target?: NamedNode;
}

const style = { width: '100%' };

const Notification: FC<NotificationProps> = ({
  readAction,
  target,
}) => {
  const lrs = useLRS();

  let content = <Property label={schema.name} />;
  if (target) {
    content = (
      <Property label={schema.target} onClick={() => readAction && lrs.exec(readAction)}>
        <Property label={schema.creator} />
        <div style={style}>
          <Property label={schema.name} />
          <Property label={schema.dateCreated} style={{ display: 'block' }} />
        </div>
      </Property>
    );
  }

  return (
    <div data-test="Notification-notification" style={{ position: 'relative' }}>
      <Card>
        <Property label={argu.unread} />
        <CardContent>
          {content}
        </CardContent>
      </Card>
    </div>
  );
};

Notification.type = argu.Notification;

Notification.topology = [
  fullResourceTopology,
  containerTopology,
];

Notification.mapDataToProps = {
  name: schema.name,
  readAction: ontola.readAction,
  target: schema.target,
};

export default register(Notification);
