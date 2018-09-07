import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import { NS } from '../../helpers/LinkedRenderStore';

import '../../components/Widget/Widget.scss';

const propTypes = {
  children: PropTypes.node,
  width: PropTypes.number,
};

const defaultProps = {
  width: 3,
};

class WidgetTopology extends TopologyProvider {
  constructor() {
    super();

    this.topology = NS.argu('widget');
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

WidgetTopology.propTypes = propTypes;
WidgetTopology.defaultProps = defaultProps;

export default WidgetTopology;
