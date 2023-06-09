import { SomeNode } from 'link-lib';
import { Map, Overlay } from 'ol';
import { Coordinate } from 'ol/coordinate';
import OverlayPositioning from 'ol/OverlayPositioning';
import {
  MouseEventHandler,
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';

import { NavigateCallback } from '../../components/ControlledMap';

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
  handleOverlayClick: MouseEventHandler<HTMLDivElement>;
  overlayRef: MutableRefObject<HTMLDivElement | null>;
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

  const handleOverlayClick = useCallback<MouseEventHandler<HTMLDivElement>>((e) => (
    e.target instanceof HTMLElement && e.target.className !== 'click-ignore' && navigate && overlayResource && navigate(overlayResource)
  ), [overlayResource]);

  return {
    handleOverlayClick,
    overlayRef,
  };
};

export default useOverlay;
