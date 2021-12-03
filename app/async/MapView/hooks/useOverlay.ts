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

import { NavigateCallback } from '../../../containers/MapView';

interface PropTypes {
  map: Map | undefined;
  navigate?: NavigateCallback;
  overlayPadding?: boolean;
  overlayPosition?: Coordinate;
  overlayResource?: SomeNode;
}

const useOverlay = ({
  map,
  navigate,
  overlayPadding,
  overlayPosition,
  overlayResource,
}: PropTypes): {
    handleOverlayClick: (e: any) => false | void;
    overlayRef: React.MutableRefObject<HTMLDivElement | null>;
  } => {
  const overlayRef = useRef(document.createElement('div'));
  const overlay = useMemo(() => {
    const element = overlayRef.current;

    if (map && element) {
      const o = new Overlay({
        autoPan: overlayPadding,
        element,
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
    e.target.className !== 'click-ignore' && navigate && overlayResource && navigate(overlayResource)
  ), [overlayResource]);

  return {
    handleOverlayClick,
    overlayRef,
  };
};

export default useOverlay;
