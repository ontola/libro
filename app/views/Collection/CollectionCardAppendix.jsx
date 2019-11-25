import as from '@ontologies/as';
import {
  Property,
  linkType,
  register,
} from 'link-redux';
import React from 'react';

import { Resource } from '../../components';
import ontola from '../../ontology/ontola';
import { cardAppendixTopology } from '../../topologies/Card/CardAppendix';

import { CollectionTypes } from './types';

const CollectionCardAppendix = ({ totalItems }) => {
  if (totalItems.value === '0') {
    return null;
  }

  return (
    <Resource>
      <Property forceRender insideCollection label={ontola.pages} />
    </Resource>
  );
};

CollectionCardAppendix.type = CollectionTypes;

CollectionCardAppendix.topology = cardAppendixTopology;

CollectionCardAppendix.mapDataToProps = {
  totalItems: as.totalItems,
};

CollectionCardAppendix.propTypes = {
  totalItems: linkType,
};

export default register(CollectionCardAppendix);
