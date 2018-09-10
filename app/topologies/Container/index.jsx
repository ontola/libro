import classNames from 'classnames';
import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { sizes } from '../../components/shared/config';

import './Container.scss';

export const containerTopology = NS.argu('container');

/**
 * Centers the content and defines width
 * @returns {component} Container with children
 */
class Container extends TopologyProvider {
  static propTypes = {
    children: PropTypes.node.isRequired,
    grid: PropTypes.bool,
    size: PropTypes.oneOf(sizes),
    spacing: PropTypes.oneOf(sizes),
  };

  static defaultProps = {
    size: 'medium',
  };

  constructor() {
    super();

    this.topology = containerTopology;
  }

  render() {
    const containerClassName = classNames({
      Container: true,
      'Container--grid': this.props.grid,
      [`Container--size-${this.props.size}`]: !this.props.grid && this.props.size,
      [`Container--spacing-${this.props.spacing}`]: this.props.spacing,
    });

    return this.wrap((
      <div className={containerClassName}>
        {this.props.children}
      </div>
    ));
  }
}

export default Container;
