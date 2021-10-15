import { NamedNode } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import { Feature } from 'ol';
import { Coordinate } from 'ol/coordinate';
import React, { useMemo } from 'react';

import LinkLoader from '../components/Loading/LinkLoader';
import Suspense from '../components/Suspense';
import { getMetaContent } from '../helpers/dom';
import useFontsChecker from '../hooks/useFontsChecker';

const MapView = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "MapView" */ '../async/MapView'),
);

export interface Point {
  lat: number;
  lon: number;
}

export enum GeometryType {
  Circle,
  Polygon,
}

export interface Geometry {
  type: GeometryType;
  points: Point[];
}

export interface Placement {
  id: string;
  image: NamedNode;
  lat: number;
  lon: number;
  zoomLevel?: number;
}

export interface PropTypes {
  initialLat?: number;
  initialLon?: number;
  initialZoom?: number;
  large?: boolean;
  mapboxTileURL?: string,
  navigate?: (resource: SomeNode) => void;
  onMapClick?: (newLon: number, newLat: number, newZoom: number) => void;
  onMove?: (args: any) => any;
  onSelect?: (feature: Feature, center: Coordinate) => any;
  onZoom?: (args: any) => any;
  overlayResource?: SomeNode;
  placements: Placement[] | SomeNode[];
}

const MapViewLoader = (props: PropTypes): JSX.Element => {
  const mapboxTileURL = useMemo(
    () => getMetaContent('mapboxTileURL'),
    [],
  );

  if (!__CLIENT__ || __TEST__) {
    return <LinkLoader />;
  }

  const fontLoaded = useFontsChecker('normal 18px FontAwesome');

  if (!fontLoaded) {
    return <LinkLoader />;
  }

  return (
    <Suspense>
      <MapView
        mapboxTileURL={mapboxTileURL}
        {...props}
      />
    </Suspense>
  );
};

export default MapViewLoader;
