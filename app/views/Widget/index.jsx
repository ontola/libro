import { Property, register } from 'link-redux';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { NS } from '../../helpers/LinkedRenderStore';
import { containerTopology } from '../../topologies/Container';
import WidgetTopology from '../../topologies/WidgetTopology/WidgetTopology';


class Widget extends PureComponent {
  static type = NS.argu('Widget');

  static mapDataToProps = [NS.argu('widgetSize')];

  static topology = containerTopology;

  static propTypes = {
    widgetSize: PropTypes.number,
  };

  render() {
    return (
      <WidgetTopology width={this.props.widgetSize}>
        <Property label={NS.argu('widgetResource')} />
      </WidgetTopology>
    );
  }
}

export default register(Widget);
