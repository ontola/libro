import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import { NS } from '../../helpers/LinkedRenderStore';

import '../../components/Widget/Widget.scss';

export const widgetTopologyTopology = NS.argu('widget');

class WidgetTopology extends TopologyProvider {
  static propTypes = {
    children: PropTypes.node,
    width: PropTypes.number,
  };

  static defaultProps = {
    width: 3,
  };

  constructor() {
    super();

    this.topology = widgetTopologyTopology;
    this.className = 'Widget';
  }

  render() {
    const { width } = this.props;

    const classes = classNames({
      Widget: true,
      [`Widget--width-${width}`]: width,
    });

    return this.wrap((
      <div className={classes}>
        {this.props.children}
      </div>
    ));
  }
}

export default WidgetTopology;
