import * as as from '@ontologies/as';
import { SomeTerm } from '@ontologies/core';
import {
  FC,
  Property,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import CardContent from '../../../Common/components/Card/CardContent';
import { cardFixedTopology } from '../../../Common/topologies/Card/CardFixed';
import { cardRowTopology } from '../../../Common/topologies/Card/CardRow';
import List, { ListDirection } from '../../../Common/topologies/List';
import ontola from '../../../Kernel/ontology/ontola';
import OmniformTrigger from '../../../Omniform/components/OmniformTrigger';
import { useHasInteraction } from '../../components/CollectionProvider';

import { CollectionTypes } from './types';

export interface CollectionSectionProps {
  direction: ListDirection;
  omniform?: boolean;
  wrap?: boolean;
  to: SomeTerm;
}

const CollectionSection: FC<CollectionSectionProps> = ({
  direction,
  omniform,
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
        {omniform && <OmniformTrigger />}
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
