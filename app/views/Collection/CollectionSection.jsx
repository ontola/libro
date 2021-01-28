import * as as from '@ontologies/as';
import {
  Property,
  linkType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import ontola from '../../ontology/ontola';
import CardList, { cardListTopology } from '../../topologies/Card/CardList';
import { cardFixedTopology } from '../../topologies/Card/CardFixed';
import { cardRowTopology } from '../../topologies/Card/CardRow';

import { CollectionTypes } from './types';

const collectionSection = ({ omniform = false, renderWhenEmpty = false } = {}, topology) => {
  const CollectionSection = ({
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

  CollectionSection.propTypes = {
    direction: PropTypes.oneOf(['column']),
    to: linkType,
    totalItems: linkType,
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
    ]
  )),
];
