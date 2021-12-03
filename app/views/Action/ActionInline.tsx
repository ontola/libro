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
  useProperty,
} from 'link-redux';
import React from 'react';
import { connect } from 'react-redux';

import { ButtonTheme } from '../../components/Button';
import { bestType, filterFind } from '../../helpers/data';
import teamGL from '../../ontology/teamGL';
import { actionsBarTopology } from '../../topologies/ActionsBar';
import { cardListTopology } from '../../topologies/Card/CardList';
import { OMNIFORM_FILTER, invalidStatusIds } from '../Thing/properties/omniform/helpers';

import { CardListOnClick, mapCardListDispatchToProps } from './helpers';

interface InlineCreateActionProps {
  count: Literal;
  omniform: boolean;
  onClick: CardListOnClick;
  theme: ButtonTheme;
}

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

const ActionInline: FC<InlineCreateActionProps> = ({
  count,
  omniform,
  onClick,
  subject,
  theme,
}) => {
  const [actionStatus] = useProperty(schema.actionStatus);
  const type = useGlobalIds(rdfx.type);

  if (invalidStatusIds.includes(rdf.id(actionStatus))) {
    return null;
  }

  const useOmniform = omniform && OMNIFORM_FILTER.find(filterFind(subject));

  if (useOmniform) {
    return (
      <Property
        count={count}
        label={schema.name}
        onClick={useOmniform ? onClick : null}
      />
    );
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

ActionInline.type = schema.Action;

ActionInline.topology = [
  actionsBarTopology,
  cardListTopology,
];

ActionInline.hocs = [
  connect(null, mapCardListDispatchToProps),
];

export default register(ActionInline);
