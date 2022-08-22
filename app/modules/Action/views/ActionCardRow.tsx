import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useProperty, 
} from 'link-redux';
import React from 'react';

import { SignInFormLink } from '../../Auth/components/SignInForm';
import Button from '../../Common/components/Button';
import {
  cardMainTopology,
  cardRowTopology,
  cardTopology, 
} from '../../Common/topologies';
import { isInvalidActionStatus } from '../hooks/useValidActions';

import { ActionProps, useDoneHandler } from './helpers';

const ActionCardRow: FC<ActionProps> = ({
  onCancel,
  onDone,
  sessionStore,
}) => {
  const [actionStatus] = useProperty(schema.actionStatus);
  const onDoneHandler = useDoneHandler(onDone);

  if (isInvalidActionStatus(actionStatus)) {
    return (
      <React.Fragment>
        <Property label={schema.name} />
        <Property label={schema.error} />
        <SignInFormLink Component={Button} />
      </React.Fragment>
    );
  }

  return (
    <Property
      header
      label={schema.target}
      sessionStore={sessionStore}
      topology={cardMainTopology}
      onCancel={onCancel}
      onDone={onDoneHandler}
    />
  );
};

ActionCardRow.type = [
  schema.Action,
  schema.UpdateAction,
];

ActionCardRow.topology = [cardTopology, cardRowTopology];

export default register(ActionCardRow);
