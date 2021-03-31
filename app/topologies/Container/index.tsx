import { Container as MaterialContainer } from '@material-ui/core';
import React from 'react';

import { Size } from '../../components/shared/config';
import argu from '../../ontology/argu';
import Topology, { TopologyContent } from '../Topology';

import './Container.scss';

export const containerTopology = argu.container;

export interface ContainerProps {
  className?: string;
  children: NonNullable<React.ReactNode>;
  size: Size;
}

/**
 * Centers the content and defines width
 * @returns {component} Container with children
 */
class Container extends Topology<ContainerProps> {
  public static defaultProps = {
    size: 'medium',
  };

  constructor(props: ContainerProps) {
    super(props);

    this.topology = containerTopology;
  }

  public renderContent(): TopologyContent {
    return this.wrap((
      <MaterialContainer maxWidth={this.maxWidth()} {...this.props} />
    ));
  }

  private maxWidth() {
    if (this.props.size === Size.Large) {
      return 'xl';
    }
    if (this.props.size === Size.Small) {
      return 'md';
    }

    return 'lg';
  }
}

export interface LargeContainerProps {
  children: NonNullable<React.ReactNode>
}

export const LargeContainer = ({ children }: LargeContainerProps): JSX.Element => (
  <Container size={Size.Large}>
    {children}
  </Container>
);

export default Container;
