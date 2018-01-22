import LinkedRenderStore from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { WidgetTopology } from '../../components';


const Widget = () => (
  <WidgetTopology>
    <Property label={NS.schema('name')} />
    <Property label={NS.schema('text')} />
    <Property label={NS.schema('url')} />
  </WidgetTopology>
);

export default LinkedRenderStore.registerRenderer(
  Widget,
  NS.argu('Widget')
);
