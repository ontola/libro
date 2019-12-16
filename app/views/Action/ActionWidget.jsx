import schema from '@ontologies/schema';
import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import { widgetTopologyTopology } from '../../topologies/WidgetTopology/WidgetTopology';

const ActionWidget = () => (
  <div>
    <Property label={schema.name} />
    <Property label={schema.text} />
    <Property label={schema.target} />
  </div>
);

ActionWidget.type = schema.Action;

ActionWidget.topology = widgetTopologyTopology;

export default register(ActionWidget);
