import schema from '@ontologies/schema';
import {
  linkType,
  register,
  subjectType,
} from 'link-redux';
import React from 'react';

import LRS, { NS } from '../../helpers/LinkedRenderStore';
import { cardTopology } from '../../topologies/Card';
import { cardFixedTopology } from '../../topologies/Card/CardFixed';
import { cardMainTopology } from '../../topologies/Card/CardMain';

const propTypes = {
  name: linkType,
  subject: subjectType,
};

const ReadActionCard = ({ subject, name }) => (
  <div
    data-test="Notification-ReadAction"
    onClick={() => LRS.exec(subject)}
    onKeyUp={() => LRS.exec(subject)}
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

ReadActionCard.type = NS.schema('ReadAction');

ReadActionCard.topology = [
  cardFixedTopology,
  cardMainTopology,
  cardTopology,
];

ReadActionCard.mapDataToProps = [schema.name];

ReadActionCard.propTypes = propTypes;

export default register(ReadActionCard);
