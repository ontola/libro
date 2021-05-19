import { LinkDevTools } from '@ontola/link-devtools';
import { useLRS } from 'link-redux';
import React from 'react';

export const useDev = (): LinkDevTools | undefined => {
  const lrs = useLRS();
  const [dev, setDev] = React.useState<LinkDevTools>();

  React.useEffect(() => {
    setDev(new LinkDevTools(lrs, undefined));
  }, [lrs]);

  return dev;
};
