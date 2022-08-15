import * as schema from '@ontologies/schema';
import {
  Property,
  register,
  useGlobalIds,
  useLRS,
  useProperty,
} from 'link-redux';
import React from 'react';

import CardContent from '../../../Common/components/Card/CardContent';
import { containerTopology, fullResourceTopology } from '../../../Common/topologies';
import Card from '../../../Common/topologies/Card';
import ontola from '../../../Kernel/ontology/ontola';
import argu from '../../ontology/argu';

const style = { width: '100%' };

const Notification = () => {
  const lrs = useLRS();
  const [readAction] = useGlobalIds(ontola.readAction);
  const [target] = useProperty(schema.target);

  let content = <Property label={schema.name} />;

  if (target) {
    content = (
      <Property
        label={schema.target}
        onClick={() => readAction && lrs.exec(readAction)}
      >
        <Property label={schema.creator} />
        <div style={style}>
          <Property label={schema.name} />
          <Property
            label={schema.dateCreated}
            style={{ display: 'block' }}
          />
        </div>
      </Property>
    );
  }

  return (
    <div
      data-test="Notification-notification"
      style={{ position: 'relative' }}
    >
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

export default register(Notification);
