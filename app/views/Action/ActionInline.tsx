import { useTheme } from '@material-ui/core';
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
import React, { SyntheticEvent } from 'react';

import { ButtonVariant } from '../../components/Button';
import { bestType, filterFind } from '../../helpers/data';
import teamGL from '../../ontology/teamGL';
import {
  omniformContext,
  omniformOpenInline,
  omniformSetAction,
} from '../../state/omniform';
import { LibroTheme } from '../../themes/themes';
import { actionsBarTopology } from '../../topologies/ActionsBar';
import { listTopology } from '../../topologies/List';
import { OMNIFORM_FILTER, invalidStatusIds } from '../Thing/properties/omniform/helpers';

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

  const { omniformState, setOmniformState } = React.useContext(omniformContext);

  const onClick = (e: SyntheticEvent<any>) => {
    e.preventDefault();

    setOmniformState(omniformOpenInline(omniformState, isPartOf.value));
    setOmniformState(omniformSetAction(omniformState, {
      action: subject,
      parentIRI: btoa(isPartOf.value),
    }));
  };

  if (invalidStatusIds.includes(rdf.id(actionStatus))) {
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
