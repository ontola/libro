import schema from '@ontologies/schema';
import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import ontola from '../../ontology/ontola';
import WidgetHeader from '../../components/Widget/WidgetHeader';
import { widgetTopologyTopology } from '../../topologies/WidgetTopology/WidgetTopology';

const ActionWidget = () => (
  <div>
    <WidgetHeader header={<Property label={schema.name} />}>
      <Property label={ontola.updateAction} onLoad={() => null} />
    </WidgetHeader>
    <Property label={schema.text} />
    <Property label={schema.target} />
  </div>
);

ActionWidget.type = schema.Action;

ActionWidget.topology = widgetTopologyTopology;

export default register(ActionWidget);
