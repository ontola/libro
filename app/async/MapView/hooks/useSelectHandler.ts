import { Feature, View } from 'ol';
import {
  Extent,
  boundingExtent,
  getCenter, 
} from 'ol/extent';
import { Point } from 'ol/geom';
import { useCallback } from 'react';

const CLUSTER_PADDING = 0.5;

export const correctZoomForViewport = (eventView: View, [left, top, right, bottom]: Extent): number | undefined => {
  // eslint-disable-next-line no-underscore-dangle
  const [width, height] = eventView.getViewportSize_();
  const resolution = eventView.getResolutionForExtentInternal(
    [left, top, right, bottom],
    [width * CLUSTER_PADDING, height * CLUSTER_PADDING],
  );

  return eventView.getZoomForResolution(resolution);
};

export const useSelectHandler = (onClusterSelect, onSelect) => useCallback((e) => {
  const [feature] = e?.selected || [];
  const features = feature?.get('features');
  const selected = features?.[0] || feature;

  if (features?.length > 1) {
    const [left, top, right, bottom] = boundingExtent(
      features.map((f: Feature<Point>) => f?.getGeometry()?.getCoordinates()),
    );
    const clusterCenter = getCenter([left, top, right, bottom]);

    if (left === right && top === bottom) {
      if (onClusterSelect) {
        onClusterSelect(features, clusterCenter);
      }
    } else {
      const eventView = e.mapBrowserEvent.map.getView();
      eventView.animate({
        center: clusterCenter,
        zoom: correctZoomForViewport(eventView, [left, top, right, bottom]),
      });
    }
  } else if (selected) {
    const geometry = selected.getGeometry();
    const selectCenter = (geometry.getType() === 'Point')
      ? geometry.getCoordinates()
      : getCenter(geometry.getExtent());

    if (onSelect) {
      onSelect(selected, selectCenter);
    }
  } else if (onSelect) {
    onSelect(undefined, undefined);
  }
}, [onSelect]);
