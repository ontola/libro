import { Container as MaterialContainer } from '@material-ui/core';
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
    size: PropTypes.oneOf(sizes),
  };

  static defaultProps = {
    size: 'medium',
  };

  constructor(props) {
    super(props);

    this.topology = containerTopology;
  }

  maxWidth() {
    if (this.props.size === 'large') {
      return 'xl';
    }
    if (this.props.size === 'small') {
      return 'md';
    }

    return 'lg';
  }

  renderContent() {
    return this.wrap((
      <MaterialContainer maxWidth={this.maxWidth()} {...this.props} />
    ));
  }
}

export const LargeContainer = ({ children }) => (
  <Container size="large">{children}</Container>
);

LargeContainer.propTypes = {
  children: PropTypes.node,
};

export default Container;
