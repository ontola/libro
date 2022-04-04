import { Container as MaterialContainer } from '@material-ui/core';
import React from 'react';

import { Size } from '../../themes/themes';
import { containerTopology } from '../../topologies';
import Topology, { TopologyContent } from '../Topology';

export interface ContainerProps {
  className?: string;
  children: NonNullable<React.ReactNode>;
  disableGutters?: boolean;
  fixed?: boolean;
  size?: Size;
}

/**
 * Centers the content and defines width
 * @returns {component} Container with children
 */
class Container<P extends ContainerProps = ContainerProps> extends Topology<P> {
  public static defaultProps = {
    size: 'medium',
  };

  constructor(props: P) {
    super(props);

    this.topology = containerTopology;
  }

  public renderContent(): TopologyContent {
    return this.wrap((
      <MaterialContainer
        data-testid="container-root"
        maxWidth={this.maxWidth()}
        {...this.props}
      />
    ));
  }

  protected maxWidth(): 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false {
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
  children: NonNullable<React.ReactNode>;
}

export const LargeContainer = ({ children }: LargeContainerProps): JSX.Element => (
  <Container size={Size.Large}>
    {children}
  </Container>
);

export default Container;
