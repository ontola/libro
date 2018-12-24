import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { widgetTopologyTopology } from '../../topologies/WidgetTopology/WidgetTopology';

class CreativeWorkWidget extends React.PureComponent {
  static type = NS.schema('CreativeWork');

  static topology = widgetTopologyTopology;

  render() {
    return (
      <React.Fragment>
        <Property label={[NS.schema('name'), NS.rdfs('label')]} />
        <Property label={[NS.schema('text'), NS.schema('description'), NS.dbo('abstract')]} />
      </React.Fragment>
    );
  }
}

export default register(CreativeWorkWidget);
