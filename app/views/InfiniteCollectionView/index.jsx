import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { containerTopology } from '../../topologies/Container';
import { primaryResourceTopology } from '../../topologies/PrimaryResource';

import Items from './properties/items';
import Next from './properties/next';
import Pages from './properties/pages';

export default [
  LinkedRenderStore.registerRenderer(
    () => <Property label={NS.as('items')} />,
    NS.argu('InfiniteCollectionView'),
    RENDER_CLASS_NAME,
    [
      containerTopology,
      primaryResourceTopology,
    ]
  ),
  ...Items,
  Next,
  ...Pages,
];
