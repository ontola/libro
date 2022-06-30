import { isNamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useLRS,
  useProperty,
} from 'link-redux';
import React from 'react';

import { cardTopology } from '../../../Common/topologies/Card';
import { cardFixedTopology } from '../../../Common/topologies/Card/CardFixed';
import { cardMainTopology } from '../../../Common/topologies/Card/CardMain';

const ReadActionCard: FC = ({ subject }) => {
  const [name] = useProperty(schema.name);

  const lrs = useLRS();
  const execAction = React.useCallback(
    () => {
      if (isNamedNode(subject)) {
        lrs.exec(subject);
      }
    },
    [lrs, subject],
  );

  return (
    <div
      data-test="Notification-ReadAction"
      onClick={execAction}
      onKeyUp={execAction}
    >
      <div
        data-test="Notification-Unread"
        style={{
          background: '#B63131',
          borderRadius: '999px',
          bottom: 0,
          boxShadow: '0px 1px 3px 0 rgba(0,0,0,0.2)',
          cursor: 'pointer',
          height: '1em',
          left: '-.6em',
          position: 'absolute',
          top: '-.6em',
          width: '1em',
        }}
        title={name && name.value}
      />
    </div>
  );
};

ReadActionCard.type = schema.ReadAction;

ReadActionCard.topology = [
  cardFixedTopology,
  cardMainTopology,
  cardTopology,
];

export default register(ReadActionCard);
