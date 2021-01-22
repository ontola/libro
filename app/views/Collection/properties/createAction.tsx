import as from '@ontologies/as';
import { Literal } from '@ontologies/core';
import schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  FC,
  register,
  Resource,
} from 'link-redux';
import React from 'react';

import ontola from '../../../ontology/ontola';
import { actionsBarTopology } from '../../../topologies/ActionsBar';

interface PropTypes {
  createAction: SomeNode;
  isPartOf: SomeNode;
  linkedProp: SomeNode;
  omniform: boolean;
  totalItems: Literal;
}

const CreateAction: FC<PropTypes> = ({
  linkedProp,
  isPartOf,
  omniform,
  totalItems,
}) => (
  <Resource
    count={totalItems}
    isPartOf={isPartOf}
    omniform={omniform}
    subject={linkedProp}
  />
);

CreateAction.type = as.Collection;

CreateAction.property = ontola.createAction;

CreateAction.topology = actionsBarTopology;

CreateAction.mapDataToProps = {
  isPartOf: schema.isPartOf,
  totalItems: as.totalItems,
};

export default register(CreateAction);
