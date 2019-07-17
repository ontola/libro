import {
  Property,
  linkType,
  register,
} from 'link-redux';
import React, { PureComponent } from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { tryParseInt } from '../../helpers/numbers';
import { containerTopology } from '../../topologies/Container';
import WidgetTopology from '../../topologies/WidgetTopology/WidgetTopology';

class Widget extends PureComponent {
  static type = NS.ontola('Widget');

  static mapDataToProps = [NS.ontola('widgetSize')];

  static topology = containerTopology;

  static propTypes = {
    widgetSize: linkType,
  };

  render() {
    return (
      <WidgetTopology width={tryParseInt(this.props.widgetSize)}>
        <Property label={NS.ontola('widgetResource')} />
      </WidgetTopology>
    );
  }
}

export default [
  register(Widget),
];
