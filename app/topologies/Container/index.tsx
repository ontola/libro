import { Container as MaterialContainer } from '@mui/material';
import { useTheme, withTheme } from '@mui/styles';
import React from 'react';

import { LibroTheme, Size } from '../../themes/themes';
import { containerTopology } from '../../topologies';
import Topology, { TopologyContent } from '../Topology';

export interface ContainerProps {
  className?: string;
  children: NonNullable<React.ReactNode>;
  disableGutters?: boolean;
  fixed?: boolean;
  size?: Size;
  theme: LibroTheme;
}

/**
 * Centers the content and defines width
 * @returns {component} Container with children
 */
class Container<P extends ContainerProps = ContainerProps> extends Topology<P> {
  constructor(props: P) {
    super(props);

    this.topology = containerTopology;
  }

  public renderContent(): TopologyContent {
    const { size, theme, ...otherProps } = this.props;

    return this.wrap((
      <MaterialContainer
        data-testid="container-root"
        maxWidth={this.maxWidth(size ?? theme.containerDefaultSize ?? Size.Large)}
        {...otherProps}
      />
    ));
  }

  protected maxWidth(size: Size): 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false {
    if (size === Size.Large) {
      return 'xl';
    }

    if (size === Size.Small) {
      return 'md';
    }

    if (size === Size.XSmall) {
      return 'sm';
    }

    return 'lg';
  }
}

export interface LargeContainerProps {
  children: NonNullable<React.ReactNode>;
}

export const LargeContainer = ({ children }: LargeContainerProps): JSX.Element => {
  const theme = useTheme<LibroTheme>();

  return (
    <Container
      size={Size.Large}
      theme={theme}
    >
      {children}
    </Container>
  );
};

export default withTheme<LibroTheme, React.JSXElementConstructor<ContainerProps>>(Container);
