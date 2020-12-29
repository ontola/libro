import { SomeNode } from 'link-lib';
import { Map, Overlay } from 'ol';
import { Coordinate } from 'ol/coordinate';
import OverlayPositioning from 'ol/OverlayPositioning';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';

interface PropTypes {
  map: Map | null;
  navigate: (resource: SomeNode) => void;
  overlayPosition: Coordinate;
  overlayResource: SomeNode;
}

const useOverlay = ({
  map,
  navigate,
  overlayPosition,
  overlayResource,
}: PropTypes) => {
  const overlayRef = useRef(document.createElement('div'));
  const overlay = useMemo(() => {
    if (map) {
      const o = new Overlay({
        autoPan: true,
        element: overlayRef.current,
        positioning: OverlayPositioning.TOP_CENTER,
        stopEvent: true,
      });
      map.addOverlay(o);

      return o;
    }

    return null;
  }, [map]);

  useEffect(() => {
    if (overlay && overlayPosition) {
      overlay.setPosition(overlayPosition);
    }
  }, [overlay, overlayPosition]);

  const handleOverlayClick = useCallback((e) => (
    e.target.className !== 'click-ignore' && navigate && navigate(overlayResource)
  ), [overlayResource]);

  return {
    handleOverlayClick,
    overlayRef,
  };
};

export default useOverlay;
