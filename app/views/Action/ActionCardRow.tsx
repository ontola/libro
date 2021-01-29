import rdf from '@ontologies/core';
import schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import Button from '../../components/Button';
import CardContent from '../../components/Card/CardContent';
import { SignInFormLink } from '../../components/SignInForm';
import { retrievePath } from '../../helpers/iris';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import { cardRowTopology } from '../../topologies/Card/CardRow';
import { invalidStatusIds } from '../Thing/properties/omniform/helpers';

import { ActionProps, useDoneHandler } from './helpers';

const ActionCardRow: FC<ActionProps> = ({
  actionStatus,
  object,
  onCancel,
  onDone,
  sessionStore,
}) => {
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
      cancelPath={object && retrievePath(object.value)}
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

ActionCardRow.mapDataToProps = {
  actionStatus: schema.actionStatus,
  object: schema.object,
};

export default register(ActionCardRow);
