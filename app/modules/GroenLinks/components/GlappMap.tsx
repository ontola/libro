import React from 'react';

import LinkLoader from '../../../components/Loading/LinkLoader';
import useFontsChecker from '../../../hooks/useFontsChecker';

const GlappMap = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "GlappMap" */ '../async/components/GlappMap'),
);

export interface Priorities {
  [state: string]: number;
}

interface Event {
  events: string[];
  image: string;
  lat: number;
  lon: number;
}

export interface Events {
  [state: string]: Event;
}

export interface PostalStats {
  events: Events;
  priorities: Priorities;
}

export interface GlappMapProps {
  selectedPostalCode?: number;
  setSelectedPostalCode: (postalDigits?: number) => void;
}

const GlappMapLoader: React.FC<GlappMapProps> = (props) => {
  if (!__CLIENT__ || __TEST__) {
    return <LinkLoader />;
  }

  const fontLoaded = useFontsChecker('normal 18px FontAwesome');

  if (!fontLoaded) {
    return null;
  }

  return (
    <React.Suspense fallback={() => null}>
      <GlappMap {...props} />
    </React.Suspense>
  );
};

export default GlappMapLoader;
