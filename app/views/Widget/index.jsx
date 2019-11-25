import {
  Property,
  linkType,
  register,
} from 'link-redux';
import React, { PureComponent } from 'react';

import { tryParseInt } from '../../helpers/numbers';
import ontola from '../../ontology/ontola';
import { containerTopology } from '../../topologies/Container';
import WidgetTopology from '../../topologies/WidgetTopology/WidgetTopology';

class Widget extends PureComponent {
  static type = ontola.Widget;

  static topology = containerTopology;

  static mapDataToProps = {
    widgetSize: ontola.widgetSize,
  };

  static propTypes = {
    widgetSize: linkType,
  };

  render() {
    return (
      <WidgetTopology width={tryParseInt(this.props.widgetSize)}>
        <Property label={ontola.widgetResource} />
      </WidgetTopology>
    );
  }
}

export default [
  register(Widget),
];
