import React from 'react';

import { Studio } from './components/Studio';
import { StudioContextProvider } from './components/StudioContextProvider';

export default (): JSX.Element => (
  <StudioContextProvider>
    <Studio />
  </StudioContextProvider>
);
