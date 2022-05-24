import React from 'react';

import HeadingContext from '../Heading/HeadingContext';

export interface CollectionFrameWrapperProps {
  Wrapper: React.ElementType,
}

export const CollectionFrameWrapper = ({ Wrapper, children }: React.PropsWithChildren<CollectionFrameWrapperProps>): JSX.Element => (
  <Wrapper>
    <HeadingContext>
      {children}
    </HeadingContext>
  </Wrapper>
);
