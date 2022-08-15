import { Container as MaterialContainer } from '@mui/material';
import { useTheme } from '@mui/styles';
import { useTopologyProvider } from 'link-redux';
import React from 'react';

import { LibroTheme, Size } from '../../../Kernel/lib/themes';
import { TopologyFC } from '../../../Kernel/lib/topology';
import { containerTopology } from '../index';

export interface ContainerProps {
  className?: string;
  disableGutters?: boolean;
  children: NonNullable<React.ReactNode>;
  fixed?: boolean;
  size?: Size;
}

export const maxWidth = (size: Size): false | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined  => {
  switch (size) {
  case Size.Large: return 'xl';
  case Size.Small: return 'md';
  case Size.XSmall: return 'sm';
  default: return 'lg';
  }
};

/**
 * Centers the content and defines a max width
 */
const Container: TopologyFC<ContainerProps> = ({ children, ...props }) => {
  const theme = useTheme<LibroTheme>();
  const [ContainerTopology, subject] = useTopologyProvider(containerTopology);
  const {
    size,
    ...containerProps
  } = props;

  return (
    <ContainerTopology>
      <MaterialContainer
        data-testid="container-root"
        maxWidth={maxWidth(size ?? theme.containerDefaultSize ?? Size.Large)}
        resource={subject?.value}
        {...containerProps}
      >
        {children}
      </MaterialContainer>
    </ContainerTopology>
  );
};

interface LargeContainerProps {
  children: NonNullable<React.ReactNode>;
}

export const LargeContainer: React.FC<LargeContainerProps> = ({ children }) => (
  <Container size={Size.Large}>
    {children}
  </Container>
);

export default Container;
