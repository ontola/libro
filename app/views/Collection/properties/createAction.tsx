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

import { ButtonVariant } from '../../../components/Button';
import { useCollectionOptions } from '../../../components/Collection/CollectionContext';
import ontola from '../../../ontology/ontola';
import { actionsBarTopology } from '../../../topologies';

interface PropTypes {
  createAction: SomeNode;
  isPartOf: SomeNode;
  linkedProp: SomeNode;
  omniform?: boolean;
  variant: ButtonVariant;
  totalItems: Literal;
}

const CollectionCreateAction: FC<PropTypes> = ({
  linkedProp,
  omniform,
  variant,
}) => {
  const { omniform: collectionOmniform } = useCollectionOptions();
  const [isPartOf] = useProperty(schema.isPartOf);

  return (
    <Resource
      isPartOf={isPartOf}
      omniform={omniform || collectionOmniform}
      subject={linkedProp}
      variant={variant}
    />
  );
};

CollectionCreateAction.type = as.Collection;

CollectionCreateAction.property = ontola.createAction;

CollectionCreateAction.topology = actionsBarTopology;

export default register(CollectionCreateAction);
