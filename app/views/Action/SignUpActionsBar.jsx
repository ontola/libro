import rdf from '@ontologies/core';
import schema from '@ontologies/schema';
import {
  Property,
  linkType,
  register,
} from 'link-redux';
import React from 'react';

import teamGL from '../../ontology/teamGL';
import { actionsBarTopology } from '../../topologies/ActionsBar';
import { invalidStatusIds } from '../Thing/properties/omniform/helpers';

const SignUpActionsBar = ({ actionStatus }) => {
  if (actionStatus === schema.CompletedActionStatus) {
    return <div className="Button">Je hebt je aangemeld voor deze actie!</div>;
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

SignUpActionsBar.mapDataToProps = {
  actionStatus: schema.actionStatus,
};

SignUpActionsBar.propTypes = {
  actionStatus: linkType,
};

export default register(SignUpActionsBar);
