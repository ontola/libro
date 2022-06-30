import type { History, Listener } from 'history';
import React from 'react';
import { Location, useLocation } from 'react-router';

type UrlMap = Map<string, number>;

const normalizedKey = (key?: string) => key ?? 'enter';

const getScroll = (): number => (
  window.pageYOffset ?? document.documentElement?.scrollTop ?? 0
);

export const scrollTo = (scrollnumber = 0): number => window.requestAnimationFrame(() => {
  window.scrollTo(0, scrollnumber);
});

const handlePop = (urlMap: UrlMap, newLocation: Location) => {
  const { state } = newLocation;
  const nextFind = urlMap.get(normalizedKey((state as any)?.key));

  if (nextFind) {
    scrollTo(nextFind);
  }
};

const handlePush = (urlMap: UrlMap, previousLocation: Location, newLocation: Location) => {
  const locationChanged =
    (previousLocation.pathname !== newLocation.pathname || previousLocation.search !== newLocation.search) &&
    previousLocation.hash === '';

  const scroll = getScroll();

  if (locationChanged) {
    scrollTo(0);

    urlMap.set(normalizedKey(newLocation.key), scroll);
  }
};

const useScrollMemory = (history: History): void => {
  const currentLocation = useLocation();
  const urlMap = React.useRef<UrlMap>(new Map());

  const handleChange = React.useCallback<Listener>(({ action, location: newLocation }) => {
    if (!__CLIENT__) {
      return;
    }

    if (action === 'POP') {
      handlePop(urlMap.current, newLocation);
    } else {
      handlePush(urlMap.current, currentLocation, newLocation);
    }
  }, [currentLocation]);

  React.useEffect(() => history.listen(handleChange), [handleChange]);
};

const ScrollMemory = ({ history }: { history: History }): null => {
  useScrollMemory(history);

  return null;
};

export default ScrollMemory;
