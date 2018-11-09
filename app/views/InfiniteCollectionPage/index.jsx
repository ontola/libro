import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { allTopologies } from '../../topologies';

import Items from './properties/items';
import Next from './properties/next';
import Pages from './properties/pages';

export default [
  LinkedRenderStore.registerRenderer(
    ({ collectionDisplay }) => <Property collectionDisplay={collectionDisplay} label={NS.as('items')} />,
    NS.argu('InfiniteCollectionView'),
    RENDER_CLASS_NAME,
    allTopologies
  ),
  ...Items,
  Next,
  ...Pages,
];
