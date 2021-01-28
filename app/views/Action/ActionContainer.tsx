import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  Resource,
} from 'link-redux';
import React from 'react';

import { containerTopology } from '../../topologies/Container';
import { ActionProps, useDoneHandler } from './helpers';

const ActionContainer: FC<ActionProps> = ({
  actionStatus,
  onDone,
  target,
}) => {
  const onDoneHandler = useDoneHandler(onDone);

  if (actionStatus && actionStatus !== schema.PotentialActionStatus) {
    return null;
  }

  return (
    <Resource
      subject={target}
      onDone={onDoneHandler}
    />
  );
};

ActionContainer.type = schema.Action;

ActionContainer.topology = [
  containerTopology,
];

ActionContainer.mapDataToProps = {
  actionStatus: schema.actionStatus,
  target: schema.target,
};

export default register(ActionContainer);
