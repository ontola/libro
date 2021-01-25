import { Feature } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { boundingExtent, getCenter } from 'ol/extent';
import { Point } from 'ol/geom';
import { SelectEvent } from 'ol/interaction/Select';
import { useCallback } from 'react';

export type SelectHandler = (feature: Feature | null, center: Coordinate | null) => any;

const CLUSTER_PADDING = 0.5;

const useHandleSelect = (onSelect: SelectHandler): (e: SelectEvent) => void => {
  return useCallback((e) => {
    const [feature] = e?.selected || [];
    const features = feature?.get('features');
    const selected = features?.[0] || feature;

    if (features?.length > 1) {
      const [left, top, right, bottom] = boundingExtent(
        features.map((f: Feature<Point>) => f?.getGeometry()?.getCoordinates()),
      );
      const clusterCenter = getCenter([left, top, right, bottom]);
      if (left !== right && top !== bottom) {
        const eventView = e.mapBrowserEvent.map.getView();
        // eslint-disable-next-line no-underscore-dangle
        const [width, height] = (eventView as any).getViewportSize_();
        const resolution = eventView.getResolutionForExtentInternal(
          [left, top, right, bottom],
          [width * CLUSTER_PADDING, height * CLUSTER_PADDING],
        );
        const newZoom = eventView.getZoomForResolution(resolution);

        e.mapBrowserEvent.map.getView().animate({
          center: clusterCenter,
          zoom: newZoom,
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
      onSelect(null, null);
    }
  }, [onSelect]);
};

export default useHandleSelect;
