import { NamedNode } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import { Feature } from 'ol';
import { Coordinate } from 'ol/coordinate';
import React from 'react';

import LinkLoader from '../components/Loading/LinkLoader';
import Suspense from '../components/Suspense';
import useFontsChecker from '../hooks/useFontsChecker';

const MapView = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "MapView" */ '../async/MapView'),
);

export interface Placement {
  id?: string;
  image?: NamedNode;
  lat?: number;
  lon?: number;
  zoomLevel?: number;
}

export interface PropTypes {
  initialLat?: number;
  initialLon?: number;
  initialZoom?: number;
  large?: boolean;
  navigate?: (resource: SomeNode) => void;
  onMapClick?: (newLon: number, newLat: number) => void;
  onMove?: (args: any) => any;
  onSelect?: (feature: Feature, center: Coordinate) => any;
  onZoom?: (args: any) => any;
  overlayResource?: SomeNode;
  placements: Array<Placement | SomeNode>;
}

const MapViewLoader = (props: PropTypes) => {
  if (!__CLIENT__ || __TEST__) {
    return <LinkLoader />;
  }

  const fontLoaded = useFontsChecker('normal 18px FontAwesome');

  if (!fontLoaded) {
    return <LinkLoader />;
  }

  return (
    <Suspense>
      <MapView {...props} />
    </Suspense>
  );
};

export default MapViewLoader;
