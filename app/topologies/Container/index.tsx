import { Container as MaterialContainer } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

import { Size, sizes } from '../../components/shared/config';
import argu from '../../ontology/argu';
import Topology from '../Topology';

import './Container.scss';

export const containerTopology = argu.container;

interface Props {
  size: Size;
}

/**
 * Centers the content and defines width
 * @returns {component} Container with children
 */
class Container extends Topology<Props> {
  public static propTypes = {
    children: PropTypes.node.isRequired,
    size: PropTypes.oneOf(sizes),
  };

  public static defaultProps = {
    size: 'medium',
  };

  constructor(props: Props) {
    super(props);

    this.topology = containerTopology;
  }

  public renderContent() {
    return this.wrap((
      <MaterialContainer maxWidth={this.maxWidth()} {...this.props} />
    ));
  }

  private maxWidth() {
    if (this.props.size === Size.large) {
      return 'xl';
    }
    if (this.props.size === Size.small) {
      return 'md';
    }

    return 'lg';
  }
}

export const LargeContainer: React.FC = ({ children }) => (
  <Container size={Size.large}>{children}</Container>
);

LargeContainer.propTypes = {
  children: PropTypes.node,
};

export default Container;
