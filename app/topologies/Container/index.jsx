import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { sizes } from '../../components/shared/config';
import argu from '../../ontology/argu';
import Topology from '../Topology';

import './Container.scss';

export const containerTopology = argu.container;

/**
 * Centers the content and defines width
 * @returns {component} Container with children
 */
class Container extends Topology {
  static propTypes = {
    children: PropTypes.node.isRequired,
    grid: PropTypes.bool,
    size: PropTypes.oneOf(sizes),
    spacing: PropTypes.oneOf(sizes),
  };

  static defaultProps = {
    size: 'medium',
  };

  constructor(props) {
    super(props);

    this.topology = containerTopology;
  }

  getClassName() {
    return classNames({
      Container: true,
      'Container--grid': this.props.grid,
      [`Container--size-${this.props.size}`]: !this.props.grid && this.props.size,
      [`Container--spacing-${this.props.spacing}`]: this.props.spacing,
    });
  }

  renderContent() {
    return this.wrap((
      <div className={this.getClassName()}>
        {this.props.children}
      </div>
    ));
  }
}

export default Container;
