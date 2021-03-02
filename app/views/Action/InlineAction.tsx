import rdf, { Literal, NamedNode } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  ReturnType,
  register,
} from 'link-redux';
import React, { SyntheticEvent } from 'react';
import { connect } from 'react-redux';

import { ButtonTheme } from '../../components/Button';
import { bestType, filterFind } from '../../helpers/data';
import teamGL from '../../ontology/teamGL';
import { actionsBarTopology } from '../../topologies/ActionsBar';
import { cardListTopology } from '../../topologies/Card/CardList';
import { OMNIFORM_FILTER, invalidStatusIds } from '../Thing/properties/omniform/helpers';

import { mapCardListDispatchToProps } from './helpers';

interface InlineCreateActionProps {
  actionStatus: NamedNode;
  count: Literal;
  omniform: boolean;
  onClick: (e: SyntheticEvent<any>) => Promise<any>;
  theme: ButtonTheme;
  type: NamedNode[];
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

const InlineAction: FC<InlineCreateActionProps> = ({
  actionStatus,
  count,
  omniform,
  onClick,
  subject,
  theme,
  type,
}) => {
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

InlineAction.type = schema.Action;

InlineAction.topology = [
  actionsBarTopology,
  cardListTopology,
];

InlineAction.mapDataToProps = {
  actionStatus: schema.actionStatus,
  object: schema.object,
  type: {
    label: rdfx.type,
    returnType: ReturnType.AllTerms,
  },
};

InlineAction.hocs = [
  connect(null, mapCardListDispatchToProps),
];

export default register(InlineAction);
