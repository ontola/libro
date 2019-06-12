import { linkType, Property, register } from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { allTopologies } from '../../topologies';

import Items from './properties/items';
import Next from './properties/next';

const InfiniteCollectionPage = ({ collectionDisplay }) => <Property collectionDisplay={collectionDisplay} label={NS.as('items')} />;

InfiniteCollectionPage.type = NS.ontola('InfiniteView');

InfiniteCollectionPage.topology = allTopologies;

InfiniteCollectionPage.mapDataToProps = [NS.ontola('collectionDisplay')];

InfiniteCollectionPage.propTypes = { collectionDisplay: linkType };

export default [
  register(InfiniteCollectionPage),
  ...Items,
  Next,
];
