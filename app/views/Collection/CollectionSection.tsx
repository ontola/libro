import * as as from '@ontologies/as';
import { NamedNode, SomeTerm } from '@ontologies/core';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import ontola from '../../ontology/ontola';
import CardList, { CardListDirection, cardListTopology } from '../../topologies/Card/CardList';
import { cardFixedTopology } from '../../topologies/Card/CardFixed';
import { cardRowTopology } from '../../topologies/Card/CardRow';

import { CollectionTypes } from './types';

interface CollectionSectionProps {
  direction: CardListDirection,
  to: SomeTerm;
  totalItems: SomeTerm;
}

const collectionSection = ({ omniform = false, renderWhenEmpty = false } = {}, topology: NamedNode | NamedNode[]) => {

  const CollectionSection: FC<CollectionSectionProps> = ({
    direction,
    totalItems,
    to,
  }) => {
    const pagesShouldRender = renderWhenEmpty || totalItems.value !== '0';

    return (
      <CardContent noStartSpacing>
        <CardList direction={direction}>
          {pagesShouldRender && <Property forceRender insideCollection label={ontola.pages} />}
          <Property label={as.totalItems} to={to} />
          <Property label={ontola.createAction} omniform={omniform} />
        </CardList>
      </CardContent>
    );
  };

  CollectionSection.type = CollectionTypes;

  CollectionSection.topology = topology;

  CollectionSection.mapDataToProps = {
    collectionType: ontola.collectionType,
    totalItems: as.totalItems,
  };

  return CollectionSection;
};


export default [
  register(collectionSection(
    { omniform: true },
    [
      cardFixedTopology,
      cardListTopology,
      cardRowTopology,
    ],
  )),
];
