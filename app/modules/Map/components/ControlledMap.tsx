import { NamedNode } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import { Feature } from 'ol';
import { Coordinate } from 'ol/coordinate';
import GeometryType from 'ol/geom/GeometryType';
import React, { useMemo } from 'react';

import { FormTheme } from '../../../components/Form/FormContext';
import LinkLoader from '../../../components/Loading/LinkLoader';
import Suspense from '../../../components/Suspense';
import { getMetaContent } from '../../../helpers/dom';
import useFontsChecker from '../../../hooks/useFontsChecker';

const ControlledMap = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "Maps" */ '../async/components/ControlledMap'),
);

export interface Point {
  lat: number;
  lon: number;
}

export interface Geometry {
  id?: string;
  image?: NamedNode;
  type: GeometryType;
  points: Point[];
  zoomLevel?: number;
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
export type MapInteractionCallback = (newGeometry: Geometry, newZoom: number) => void;
export type MapMoveCallback = (newCenter: Coordinate) => void;
export type MapViewChangeCallback = (center: Coordinate, zoom: number) => void;
export type MapZoomCallback = (newZoom: number) => void;
export type NavigateCallback = (resource: SomeNode) => void;

export interface ControlledMapProps extends SharedMapProps {
  availableInteractionTypes?: GeometryType[];
  layers: Layer[];
  mapboxTileURL?: string,
  view?: ViewProps;
}

export interface SharedMapProps {
  initialLat?: number;
  initialLon?: number;
  initialZoom?: number;
  variant?: MapVariant;
  navigate?: NavigateCallback;
  onInteraction?: MapInteractionCallback;
  onMapViewChange?: MapViewChangeCallback;
  onMove?: MapMoveCallback;
  onSelect?: FeatureSelectCallback;
  onZoom?: MapZoomCallback;
  overlayPadding?: boolean;
  overlayResource?: SomeNode;
  overlayPosition?: Coordinate;
  theme?: FormTheme
}

const ControlledMapLoader = (props: ControlledMapProps): JSX.Element => {
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
      <ControlledMap
        mapboxTileURL={mapboxTileURL}
        {...props}
      />
    </Suspense>
  );
};

export default ControlledMapLoader;
