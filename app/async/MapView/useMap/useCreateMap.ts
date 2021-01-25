import { Collection, Map as OLMap, View } from 'ol';
import { Control, defaults as defaultControls, FullScreen } from 'ol/control';
import { Coordinate } from 'ol/coordinate';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat } from 'ol/proj';
import TileSource from 'ol/source/Tile';
import { RefObject, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import CurrentLocation from '../CurrentLocation';
import getStyle from '../getStyle';

import { LayerSources } from './useLayerSource';

const DEFAULT_LAT = 52.1344;
const DEFAULT_LON = 5.1917;

export interface ViewProps {
  center: Coordinate;
  zoom: number;
}

export interface CreateMapProps {
  accessToken: string;
  controls: Collection<Control>;
  layerSources: LayerSources;
  mapRef: RefObject<HTMLDivElement | null>;
  tileSource: TileSource | null;
  view: ViewProps;
}

const messages = {
  fullScreen: {
    id: 'https://app.argu.co/i18n/forms/map/fullScreen',
  },
  showCurrentLocation: {
    id: 'https://app.argu.co/i18n/forms/map/showCurrentLocation',
  },
  zoomIn: {
    id: 'https://app.argu.co/i18n/forms/map/zoomIn',
  },
  zoomOut: {
    id: 'https://app.argu.co/i18n/forms/map/zoomOut',
  },
};

const createMap = ({
  accessToken,
  controls,
  layerSources,
  mapRef,
  tileSource,
  view,
}: CreateMapProps): OLMap | null => {
  const { current } = mapRef;
  const { center, zoom } = view || {};

  if (!current || !accessToken || !layerSources || !tileSource) {
    return null;
  }

  const layers = [
    new TileLayer({
      source: tileSource,
    }),
    ...layerSources.map((source) => (
      new VectorLayer({
        source,
        style: getStyle('style'),
      })
    )),
  ];

  return new OLMap({
    controls,
    layers,
    target: current,
    view: new View({
      center: center || fromLonLat([DEFAULT_LON, DEFAULT_LAT]),
      zoom,
    }),
  });
};

const useCreateMap = (
  accessToken: string,
  mapRef: RefObject<HTMLDivElement>,
  view: ViewProps,
  layerSources: LayerSources,
  tileSource: TileSource | null,
): OLMap | null => {
  const intl = useIntl();
  const [memoizedMap, setMap] = useState<OLMap | null>(null);

  useEffect(() => {
    const currentLocation = new CurrentLocation({
      tipLabel: intl.formatMessage(messages.showCurrentLocation),
    });
    const controls = defaultControls({
      rotate: false,
      zoomOptions: {
        zoomInTipLabel: intl.formatMessage(messages.zoomIn),
        zoomOutTipLabel: intl.formatMessage(messages.zoomOut),
      },
    }).extend([
      currentLocation,
      new FullScreen({
        tipLabel: intl.formatMessage(messages.fullScreen),
      }),
    ]);

    const map = createMap({
      accessToken,
      controls,
      layerSources,
      mapRef,
      tileSource,
      view,
    });
    setMap(map);

    return () => {
      if (currentLocation) {
        currentLocation.stop();
      }
    };
  }, [mapRef.current, accessToken, layerSources, tileSource]);

  return memoizedMap;
};

export default useCreateMap;
