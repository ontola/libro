import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { containerTopology } from '../../topologies/Container';
import WidgetTopology from '../../topologies/WidgetTopology/WidgetTopology';


const Widget = () => (
  <WidgetTopology>
    <Property label={NS.schema('name')} />
    <Property label={NS.schema('text')} />
    <Property label={NS.schema('url')} />
  </WidgetTopology>
);

export default LinkedRenderStore.registerRenderer(
  Widget,
  NS.argu('Widget'),
  RENDER_CLASS_NAME,
  containerTopology
);
