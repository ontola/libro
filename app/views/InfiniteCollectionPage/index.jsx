import { linkType, Property, register } from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { allTopologiesExcept } from '../../topologies';
import { widgetTopologyTopology } from '../../topologies/WidgetTopology/WidgetTopology';

import InfiniteCollectionPageWidget from './InfiniteCollectionPageWidget';
import Items from './properties/items';
import Next from './properties/next';

const InfiniteCollectionPage = ({ collectionDisplay }) => <Property collectionDisplay={collectionDisplay} label={NS.as('items')} />;

InfiniteCollectionPage.type = NS.ontola('InfiniteView');

InfiniteCollectionPage.topology = allTopologiesExcept(widgetTopologyTopology);

InfiniteCollectionPage.mapDataToProps = [NS.ontola('collectionDisplay')];

InfiniteCollectionPage.propTypes = { collectionDisplay: linkType };

export default [
  register(InfiniteCollectionPage),
  ...InfiniteCollectionPageWidget,
  ...Items,
  Next,
];
