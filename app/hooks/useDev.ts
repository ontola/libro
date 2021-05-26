import { LinkDevTools } from '@ontola/link-devtools';
import { LinkReduxLRSType, useLRS } from 'link-redux';
import React from 'react';

export const useDev = (lrsOverride: LinkReduxLRSType | undefined): LinkDevTools | undefined => {
  const lrs = useLRS();
  const [dev, setDev] = React.useState<LinkDevTools>();

  React.useEffect(() => {
    setDev(new LinkDevTools(lrsOverride ?? lrs, undefined));
  }, [lrsOverride, lrs]);

  return dev;
};
