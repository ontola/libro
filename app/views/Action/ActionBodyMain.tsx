import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import { mainBodyTopology } from '../../topologies/MainBody';

import { ActionProps, useDoneHandler } from './helpers';

const ActionBodyMain: FC<ActionProps> = ({
  onCancel,
  onDone,
  sessionStore,
}) => {
  const [actionStatus] = useProperty(schema.actionStatus);
  const onDoneHandler = useDoneHandler(onDone);

  if (actionStatus !== schema.PotentialActionStatus) {
    return null;
  }

  return (
    <Property
      header
      label={schema.target}
      sessionStore={sessionStore}
      topology={mainBodyTopology}
      onCancel={onCancel}
      onDone={onDoneHandler}
    />
  );
};

ActionBodyMain.type = schema.Action;

ActionBodyMain.topology = [
  mainBodyTopology,
];

export default register(ActionBodyMain);
