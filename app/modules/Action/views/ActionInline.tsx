import { useTheme } from '@mui/material';
import rdf, { Literal, NamedNode } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useGlobalIds,
  useProperty,
} from 'link-redux';
import React from 'react';

import teamGL from '../../GroenLinks/ontology/teamGL';
import { LibroTheme } from '../../../themes/themes';
import { actionsBarTopology, listTopology } from '../../../topologies';
import { ButtonVariant } from '../../Common/components/Button';
import { bestType } from '../../Common/lib/data';
import { isInvalidActionStatus } from '../hooks/useEnabledActions';

import { CardListOnClick } from './helpers';

interface InlineCreateActionProps {
  count: Literal;
  onClick: CardListOnClick;
  variant: ButtonVariant;
}

function getColor(theme: LibroTheme, types: NamedNode[]) {
  switch (rdf.id(bestType(types))) {
  case rdf.id(teamGL.ContactedAction):
    return theme.palette.primary.main;
  case rdf.id(teamGL.NotAvailableAction):
  case rdf.id(teamGL.UnsubscribeAction):
    return theme.palette.secondary.main;
  default:
    return undefined;
  }
}

const ActionInline: FC<InlineCreateActionProps> = ({
  variant,
}) => {
  const materialTheme = useTheme();
  const [actionStatus] = useProperty(schema.actionStatus);
  const type = useGlobalIds(rdfx.type);

  if (isInvalidActionStatus(actionStatus)) {
    return null;
  }

  const color = getColor(materialTheme, type);

  return (
    <Property
      modal
      color={color}
      label={schema.target}
      variant={color ? ButtonVariant.Toggle : variant}
    />
  );
};

ActionInline.type = schema.Action;

ActionInline.topology = [
  actionsBarTopology,
  listTopology,
];

export default register(ActionInline);
