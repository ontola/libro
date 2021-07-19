import rdf from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import Button from '../../components/Button';
import CardContent from '../../components/Card/CardContent';
import { SignInFormLink } from '../../components/SignInForm';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import { cardRowTopology } from '../../topologies/Card/CardRow';
import { invalidStatusIds } from '../Thing/properties/omniform/helpers';

import { ActionProps, useDoneHandler } from './helpers';

const ActionCardRow: FC<ActionProps> = ({
  onCancel,
  onDone,
  sessionStore,
}) => {
  const [actionStatus] = useProperty(schema.actionStatus);
  const onDoneHandler = useDoneHandler(onDone);

  if (invalidStatusIds.includes(rdf.id(actionStatus))) {
    return (
      <CardContent endSpacing>
        <Property label={schema.name} />
        <Property label={schema.error} />
        <SignInFormLink Component={Button} />
      </CardContent>
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

ActionCardRow.topology = cardRowTopology;

export default register(ActionCardRow);
