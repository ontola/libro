import * as as from '@ontologies/as';
import { SomeTerm } from '@ontologies/core';
import {
  FC,
  Property,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import { useHasInteraction } from '../../components/Collection/CollectionProvider';
import ontola from '../../ontology/ontola';
import { cardFixedTopology } from '../../topologies/Card/CardFixed';
import { cardRowTopology } from '../../topologies/Card/CardRow';
import List, { ListDirection } from '../../topologies/List';

import { CollectionTypes } from './types';

export interface CollectionSectionProps {
  direction: ListDirection,
  wrap?: boolean;
  to: SomeTerm;
}

const CollectionSection: FC<CollectionSectionProps> = ({
  direction,
  subject,
  to,
  wrap,
}) => {
  const [totalItems] = useProperty(as.totalItems);
  const pagesShouldRender = totalItems?.value !== '0';
  const hasInteraction = useHasInteraction(subject);

  if (!pagesShouldRender && !hasInteraction) {
    return null;
  }

  return (
    <CardContent>
      <List
        direction={direction}
        wrap={wrap}
      >
        {pagesShouldRender && (
          <Property
            forceRender
            insideCollection
            label={ontola.pages}
          />
        )}
        <Property
          label={as.totalItems}
          to={to}
        />
        <Property
          omniform
          label={ontola.createAction}
        />
      </List>
    </CardContent>
  );
};

CollectionSection.type = CollectionTypes;

CollectionSection.topology = [
  cardFixedTopology,
  cardRowTopology,
];

export default register(CollectionSection);
