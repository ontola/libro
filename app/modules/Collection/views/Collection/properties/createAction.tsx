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

import { actionsBarTopology } from '../../../../Action/topologies';
import { ButtonVariant } from '../../../../Common/components/Button';
import ontola from '../../../../Kernel/ontology/ontola';

interface PropTypes {
  createAction: SomeNode;
  isPartOf: SomeNode;
  linkedProp: SomeNode;
  variant: ButtonVariant;
  totalItems: Literal;
}

const CollectionCreateAction: FC<PropTypes> = ({
  linkedProp,
  variant,
}) => {
  const [isPartOf] = useProperty(schema.isPartOf);

  return (
    <Resource
      isPartOf={isPartOf}
      subject={linkedProp}
      variant={variant}
    />
  );
};

CollectionCreateAction.type = as.Collection;

CollectionCreateAction.property = ontola.createAction;

CollectionCreateAction.topology = actionsBarTopology;

export default register(CollectionCreateAction);
