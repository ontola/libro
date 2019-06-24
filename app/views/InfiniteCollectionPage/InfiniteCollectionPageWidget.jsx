import { linkType, Property, register } from 'link-redux';
import React from 'react';
import PropTypes from 'prop-types';

import { NS } from '../../helpers/LinkedRenderStore';
import { widgetTopologyTopology } from '../../topologies/WidgetTopology/WidgetTopology';

import Items from './properties/items';
import Next from './properties/next';

const InfiniteCollectionPageWidget = ({ collectionDisplay, insideCollection }) => (
  <Property
    baseCollectionLink={!insideCollection}
    collectionDisplay={collectionDisplay}
    label={NS.as('items')}
  />
);

InfiniteCollectionPageWidget.type = NS.ontola('InfiniteView');

InfiniteCollectionPageWidget.topology = widgetTopologyTopology;

InfiniteCollectionPageWidget.mapDataToProps = [NS.ontola('collectionDisplay')];

InfiniteCollectionPageWidget.propTypes = {
  collectionDisplay: linkType,
  insideCollection: PropTypes.bool,
};

export default [
  register(InfiniteCollectionPageWidget),
  ...Items,
  Next,
];
