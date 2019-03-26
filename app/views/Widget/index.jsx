import { linkType, Property, register } from 'link-redux';
import React, { PureComponent } from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { tryParseInt } from '../../helpers/numbers';
import { containerTopology } from '../../topologies/Container';
import WidgetTopology from '../../topologies/WidgetTopology/WidgetTopology';

class Widget extends PureComponent {
  static type = NS.argu('Widget');

  static mapDataToProps = [NS.argu('widgetSize')];

  static topology = containerTopology;

  static propTypes = {
    widgetSize: linkType,
  };

  render() {
    return (
      <WidgetTopology width={tryParseInt(this.props.widgetSize)}>
        <Property label={NS.argu('widgetResource')} />
      </WidgetTopology>
    );
  }
}

export default [
  register(Widget),
];
