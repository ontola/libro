import rdf from '@ontologies/core';
import schema from '@ontologies/schema';
import rdfx from '@ontologies/rdf';
import {
  Property,
  ReturnType,
  linkType,
  register,
} from 'link-redux';
import React from 'react';

import { bestType } from '../../helpers/data';
import teamGL from '../../ontology/teamGL';
import { actionsBarTopology } from '../../topologies/ActionsBar';
import { invalidStatusIds } from '../Thing/properties/omniform/helpers';

function getVariant(types) {
  switch (rdf.id(bestType(types))) {
    case rdf.id(teamGL.ContactedAction):
      return 'success';
    case rdf.id(teamGL.NotAvailableAction):
    case rdf.id(teamGL.UnsubscribeAction):
      return 'error';
    default:
      return undefined;
  }
}

const ActionActionsBar = ({
  actionStatus,
  type,
}) => {
  if (invalidStatusIds.includes(rdf.id(actionStatus))) {
    return null;
  }

  return (
    <Property
      modal
      label={schema.target}
      variant={getVariant(type)}
    />
  );
};

ActionActionsBar.type = schema.Action;

ActionActionsBar.topology = actionsBarTopology;

ActionActionsBar.mapDataToProps = {
  actionStatus: schema.actionStatus,
  type: {
    label: rdfx.type,
    returnType: ReturnType.AllTerms,
  },
};

ActionActionsBar.propTypes = {
  actionStatus: linkType,
  type: linkType,
};

export default register(ActionActionsBar);
