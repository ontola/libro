import { Container as MaterialContainer } from '@mui/material';
import { useTheme } from '@mui/styles';
import {
  TopologyFC,
  createTopologyProvider,
  useLinkRenderContext, 
} from 'link-redux';
import React from 'react';

import { LibroTheme, Size } from '../../../Kernel/lib/themes';
import { containerTopology } from '../index';

export interface ContainerProps {
  className?: string;
  disableGutters?: boolean;
  children: NonNullable<React.ReactNode>;
  fixed?: boolean;
  size?: Size;
}

export const maxWidth = (size: Size): false | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined => {
  switch (size) {
  case Size.Large:
    return 'xl';
  case Size.Small:
    return 'md';
  case Size.XSmall:
    return 'sm';
  default:
    return 'lg';
  }
};

const ContainerTopology = createTopologyProvider(containerTopology);

/**
 * Centers the content and defines a max width
 */
const Container: TopologyFC<ContainerProps> = ({ children, ...props }) => {
  const { subject } = useLinkRenderContext();
  const theme = useTheme<LibroTheme>();
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
