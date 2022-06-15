import * as schema from '@ontologies/schema';
import {
  FC,
  Resource,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import { containerTopology } from '../../../topologies';

import { ActionProps, useDoneHandler } from './helpers';

const ActionContainer: FC<ActionProps> = ({
  onDone,
}) => {
  const [actionStatus] = useProperty(schema.actionStatus);
  const [target] = useProperty(schema.target);
  const onDoneHandler = useDoneHandler(onDone);

  if (actionStatus !== schema.PotentialActionStatus) {
    return null;
  }

  if (!target) {
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

export default register(ActionContainer);
