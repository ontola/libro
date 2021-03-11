import rdf, { NamedNode, SomeTerm } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  ReturnType,
  register,
} from 'link-redux';
import React from 'react';

import { ButtonTheme } from '../../components/Button';
import { bestType } from '../../helpers/data';
import teamGL from '../../ontology/teamGL';
import { actionsBarTopology } from '../../topologies/ActionsBar';
import { invalidStatusIds } from '../Thing/properties/omniform/helpers';

function getVariant(types: NamedNode[]) {
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

export interface ActionActionsBarProps {
  actionStatus: SomeTerm;
  theme: ButtonTheme;
  type: NamedNode[];
}

const ActionActionsBar: FC<ActionActionsBarProps> = ({
  actionStatus,
  theme,
  type,
}) => {
  if (actionStatus && invalidStatusIds.includes(rdf.id(actionStatus))) {
    return null;
  }

  return (
    <Property
      modal
      label={schema.target}
      theme={theme}
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

export default register(ActionActionsBar);
