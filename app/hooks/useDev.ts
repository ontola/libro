import enableDevtools from '@ontola/link-devtools';
import { LinkReduxLRSType, useLRS } from 'link-redux';
import React from 'react';

export const useDev = (lrsOverride?: LinkReduxLRSType | undefined): void => {
  const lrs = useLRS();

  React.useEffect(() => {
    enableDevtools(lrsOverride ?? lrs);
  }, [lrsOverride, lrs]);
};
