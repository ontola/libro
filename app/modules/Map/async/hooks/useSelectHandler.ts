import { Feature, View } from 'ol';
import {
  Extent,
  boundingExtent,
  getCenter,
} from 'ol/extent';
import { Point } from 'ol/geom';
import { useCallback } from 'react';

import { ClusterSelectCallback, FeatureSelectCallback } from '../../components/ControlledMap';

const CLUSTER_PADDING = 0.5;

export const getZoomForCluster = (eventView: View, extent: Extent): number | undefined => {
  // eslint-disable-next-line no-underscore-dangle
  const [width, height] = (eventView as any).getViewportSize_();
  const resolution = eventView.getResolutionForExtentInternal(
    extent,
    [width * CLUSTER_PADDING, height * CLUSTER_PADDING],
  );

  return eventView.getZoomForResolution(resolution);
};

export const zoomOnCluster = (eventView: View, extent: Extent): void =>
  eventView.animate({
    center: getCenter(extent),
    zoom: getZoomForCluster(eventView, extent),
  });

export const useSelectHandler = (
  onClusterSelect?: ClusterSelectCallback,
  onSelect?: FeatureSelectCallback,
): (e: any) => void => useCallback((e) => {
  const [feature] = e?.selected || [];
  const features = feature?.get('features');
  const selectedFeature = features?.[0] || feature;

  if (features?.length > 1) {

    const [left, top, right, bottom] = boundingExtent(
      features.map((f: Feature<Point>) => f?.getGeometry()?.getCoordinates()),
    );

    if (left === right && top === bottom) {
      if (onClusterSelect) {
        onClusterSelect(features, getCenter([left, top, right, bottom]));
      }
    } else {
      zoomOnCluster(e.mapBrowserEvent.map.getView(), [left, top, right, bottom]);
    }
  } else if (selectedFeature && onSelect) {
    const geometry = selectedFeature.getGeometry();
    const selectCenter = (geometry.getType() === 'Point')
      ? geometry.getCoordinates()
      : getCenter(geometry.getExtent());

    onSelect(selectedFeature, selectCenter);
  } else if (onSelect) {
    onSelect(undefined, undefined);
  }
}, [onSelect]);
