import React from 'react';

import { StudioContextProvider } from './StudioContextProvider';
import { StudioFrame } from './StudioFrame';

const Studio = (): JSX.Element => (
  <StudioContextProvider>
    <StudioFrame />
  </StudioContextProvider>
);

export default Studio;
