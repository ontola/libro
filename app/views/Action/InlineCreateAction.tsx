import rdf, { Literal, NamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React, { SyntheticEvent } from 'react';
import { connect } from 'react-redux';

import { filterFind } from '../../helpers/data';
import { cardFloatTopology } from '../../topologies/Card/CardFloat';
import { cardListTopology } from '../../topologies/Card/CardList';
import { OMNIFORM_FILTER, invalidStatusIds } from '../Thing/properties/omniform/helpers';

import { mapCardListDispatchToProps } from './helpers';

interface InlineCreateActionProps {
  actionStatus: NamedNode;
  count: Literal;
  omniform: boolean;
  onClick: (e: SyntheticEvent<any>) => Promise<any>;
  subject: SomeNode;
}

const InlineCreateAction: FC<InlineCreateActionProps> = ({
  actionStatus,
  count,
  omniform,
  onClick,
  subject,
}) => {
  if (invalidStatusIds.includes(rdf.id(actionStatus))) {
    return null;
  }

  return (
    <Property
      count={count}
      label={schema.name}
      onClick={omniform && OMNIFORM_FILTER.find(filterFind(subject)) ? onClick : undefined}
    />
  );
};

InlineCreateAction.type = schema.CreateAction;

InlineCreateAction.topology = [
  cardFloatTopology,
  cardListTopology,
];

InlineCreateAction.mapDataToProps = {
  actionStatus: schema.actionStatus,
  object: schema.object,
};

InlineCreateAction.hocs = [
  connect(null, mapCardListDispatchToProps),
];

export default register(InlineCreateAction);
