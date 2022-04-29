import { useTheme } from '@mui/material';
import rdf, {
  Literal,
  NamedNode,
} from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useGlobalIds,
  useIds,
  useProperty,
} from 'link-redux';
import React from 'react';

import { ButtonVariant } from '../../components/Button';
import { bestType, filterFind } from '../../helpers/data';
import teamGL from '../../ontology/teamGL';
import { useOmniformOpenAction } from '../../state/omniform';
import { LibroTheme } from '../../themes/themes';
import { actionsBarTopology, listTopology } from '../../topologies';
import { OMNIFORM_FILTER, isInvalidActionStatus } from '../Thing/properties/omniform/helpers';

import { CardListOnClick } from './helpers';

interface InlineCreateActionProps {
  count: Literal;
  omniform: boolean;
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
  omniform,
  subject,
  variant,
}) => {
  const materialTheme = useTheme();
  const [actionStatus] = useProperty(schema.actionStatus);
  const type = useGlobalIds(rdfx.type);
  const [isPartOf] = useIds(schema.isPartOf);

  const onClick = useOmniformOpenAction(isPartOf, subject);

  if (isInvalidActionStatus(actionStatus)) {
    return null;
  }

  const useOmniform = omniform && OMNIFORM_FILTER.find(filterFind(subject));

  if (useOmniform) {
    return (
      <Property
        label={schema.name}
        onClick={useOmniform ? onClick : null}
      />
    );
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
