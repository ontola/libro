import rdf from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  Property,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import ontola from '../../../../ontology/ontola';
import teamGL from '../../../../ontology/teamGL';
import { actionsBarTopology } from '../../../../topologies/ActionsBar';
import { invalidStatusIds } from '../../../../views/Thing/properties/omniform/helpers';

const SignUpActionsBar = () => {
  const [actionStatus] = useProperty(schema.actionStatus);

  if (actionStatus === schema.CompletedActionStatus) {
    return (
      <div className="Button">
        Je hebt je aangemeld voor deze actie!
      </div>
    );
  }

  if (actionStatus === ontola.ExpiredActionStatus) {
    return (
      <div className="Button">
        Deze actie zit al vol.
      </div>
    );
  }

  if (invalidStatusIds.includes(rdf.id(actionStatus))) {
    return null;
  }

  return (
    <Property
      modal
      label={schema.target}
      variant="success"
    />
  );
};

SignUpActionsBar.type = teamGL.SignUpAction;

SignUpActionsBar.topology = actionsBarTopology;

export default register(SignUpActionsBar);
