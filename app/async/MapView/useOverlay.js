import { Overlay } from 'ol';
import OverlayPositioning from 'ol/OverlayPositioning';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';

const useOverlay = ({
  map,
  navigate,
  overlayPadding,
  overlayPosition,
  overlayResource,
}) => {
  const overlayRef = useRef(document.createElement('div'));
  const overlay = useMemo(() => {
    if (map) {
      const o = new Overlay({
        autoPan: overlayPadding,
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
