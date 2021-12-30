import { NamedNode } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import { Feature } from 'ol';
import { Coordinate } from 'ol/coordinate';
import React, { useMemo } from 'react';

import { FormTheme } from '../components/Form/Form';
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

export interface Layer {
  clustered?: boolean;
  features: Feature[];
}

export interface ViewProps {
  center: Coordinate;
  zoom: number;
}

export enum MapVariant {
  Default,
  Flow,
  Fullscreen,
  MapQuestion,
}

export type ClusterSelectCallback = (features: Feature[], center: Coordinate) => void;
export type FeatureSelectCallback = (feature?: Feature, center?: Coordinate) => void;
export type MapClickCallback = (newLon: number, newLat: number, newZoom: number) => void;
export type MapMoveCallback = (newCenter: Coordinate) => void;
export type MapViewChangeCallback = (center: Coordinate, zoom: number) => void;
export type MapZoomCallback = (newZoom: number) => void;
export type NavigateCallback = (resource: SomeNode) => void;

export interface MapViewProps {
  initialLat?: number;
  initialLon?: number;
  initialZoom?: number;
  variant?: MapVariant;
  mapboxTileURL?: string,
  navigate?: NavigateCallback;
  onMapClick?: MapClickCallback;
  onMapViewChange?: MapViewChangeCallback;
  onMove?: MapMoveCallback;
  onSelect?: FeatureSelectCallback;
  onZoom?: MapZoomCallback;
  overlayResource?: SomeNode;
  placements: Placement[] | SomeNode[];
  theme?: FormTheme
}

const MapViewLoader = (props: MapViewProps): JSX.Element => {
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
