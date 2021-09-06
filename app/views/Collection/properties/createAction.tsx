import * as as from '@ontologies/as';
import { Literal } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  FC,
  Resource,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import { ButtonTheme } from '../../../components/Button';
import { useCollectionOptions } from '../../../components/Collection/CollectionProvider';
import ontola from '../../../ontology/ontola';
import { actionsBarTopology } from '../../../topologies/ActionsBar';

interface PropTypes {
  createAction: SomeNode;
  isPartOf: SomeNode;
  linkedProp: SomeNode;
  omniform?: boolean;
  theme: ButtonTheme;
  totalItems: Literal;
}

const CreateAction: FC<PropTypes> = ({
  linkedProp,
  omniform,
  theme,
}) => {
  const { omniform: collectionOmniform } = useCollectionOptions();
  const [isPartOf] = useProperty(schema.isPartOf);
  const [totalItems] = useProperty(as.totalItems);

  return (
    <Resource
      count={totalItems}
      isPartOf={isPartOf}
      omniform={omniform || collectionOmniform}
      subject={linkedProp}
      theme={theme}
    />
  );
};

CreateAction.type = as.Collection;

CreateAction.property = ontola.createAction;

CreateAction.topology = actionsBarTopology;

export default register(CreateAction);
