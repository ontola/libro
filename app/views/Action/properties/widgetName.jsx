import schema from '@ontologies/schema';
import { linkedPropType, register } from 'link-redux';
import React from 'react';

import { Heading } from '../../../components';
import { widgetTopologyTopology } from '../../../topologies/WidgetTopology/WidgetTopology';

const WidgetActionName = ({ linkedProp }) => (
  <Heading size="2">
    {linkedProp.value}
  </Heading>
);

WidgetActionName.type = schema.Action;

WidgetActionName.topology = widgetTopologyTopology;

WidgetActionName.property = schema.name;

WidgetActionName.propTypes = {
  linkedProp: linkedPropType,
};

export default register(WidgetActionName);
