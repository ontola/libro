import { Property, linkType, register } from 'link-redux';
import React from 'react';

import { Resource } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import { cardAppendixTopology } from '../../topologies/Card/CardAppendix';

import { CollectionTypes } from './types';

const CollectionCardAppendix = ({ totalItems }) => {
  if (totalItems.value === '0') {
    return null;
  }

  return (
    <Resource>
      <Property forceRender insideCollection label={NS.as('pages')} />
    </Resource>
  );
};

CollectionCardAppendix.type = CollectionTypes;

CollectionCardAppendix.topology = cardAppendixTopology;

CollectionCardAppendix.mapDataToProps = [
  NS.as('totalItems'),
];

CollectionCardAppendix.propTypes = {
  totalItems: linkType,
};

export default register(CollectionCardAppendix);
