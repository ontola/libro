import * as as from '@ontologies/as';
import { SomeTerm } from '@ontologies/core';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import ResourceBoundary from '../../components/ResourceBoundary';
import { tryParseInt } from '../../helpers/numbers';
import ontola from '../../ontology/ontola';
import { cardAppendixTopology } from '../../topologies/Card/CardAppendix';

import { CollectionTypes } from './types';

interface CollectionCardAppendixProps {
  totalItems: SomeTerm;
}

const CollectionCardAppendix: FC<CollectionCardAppendixProps> = ({ totalItems }) => {
  if (tryParseInt(totalItems) === 0) {
    return null;
  }

  return (
    <ResourceBoundary>
      <Property forceRender insideCollection label={ontola.pages} />
    </ResourceBoundary>
  );
};

CollectionCardAppendix.type = CollectionTypes;

CollectionCardAppendix.topology = cardAppendixTopology;

CollectionCardAppendix.mapDataToProps = {
  totalItems: as.totalItems,
};

export default register(CollectionCardAppendix);
