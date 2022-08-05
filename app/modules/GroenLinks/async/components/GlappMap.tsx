import rdf from '@ontologies/core';
import { useFields, useLRS } from 'link-redux';
import { Coordinate } from 'ol/coordinate';
import { fromLonLat } from 'ol/proj';
import React from 'react';

import useJSON from '../../../Common/hooks/useJSON';
import { tryParseFloat } from '../../../Common/lib/numbers';
import { LoadingCard } from '../../../Common/components/Loading';
import { ShowDialog } from '../../../Common/middleware/actions';
import { getMetaContent } from '../../../Kernel/lib/dom';
import app from '../../../Common/ontology/app';
import MapCanvas from '../../../Map/async/components/MapCanvas';
import { FOCUS_ZOOM } from '../../../Map/async/hooks/useMap';
import {
  ClusterSelectCallback,
  FeatureSelectCallback,
  MapVariant,
  MapViewChangeCallback,
  ViewProps,
} from '../../../Map/components/ControlledMap';
import { GlappMapProps, PostalStats } from '../../components/GlappMap';
import teamGL from '../../ontology/teamGL';
import { postalCodeIri } from '../../views/Glapp/helpers';
import useEventsLayer from '../hooks/useEventsLayer';
import usePostalShapes, { PostalCodes } from '../hooks/usePostalShapes';
import useSelectedPostalCode from '../hooks/useSelectedPostalCode';

const DEFAULT_LAT = 52.1344;
const DEFAULT_LON = 5.1917;
const DEFAULT_ZOOM = 6.8;
const FULL_POSTAL_LEVEL = 8.6;

const GlappMap: React.FC<GlappMapProps> = ({
  selectedPostalCode,
  setSelectedPostalCode,
}) => {
  const lrs = useLRS();
  const [zoomProp] = useFields(app.c_a, teamGL.zoom);
  const zoom = tryParseFloat(zoomProp);
  const [latProp] = useFields(app.c_a, teamGL.centerLat);
  const centerLat = tryParseFloat(latProp);
  const [lonProp] = useFields(app.c_a, teamGL.centerLon);
  const centerLon = tryParseFloat(lonProp);
  const [view, setView] = React.useState<ViewProps>({
    center: fromLonLat([centerLon ?? DEFAULT_LON, centerLat ?? DEFAULT_LAT]),
    zoom: zoom ?? DEFAULT_ZOOM,
  });
  const showFull = (view?.zoom || 0) > FULL_POSTAL_LEVEL;
  const [postalCodes] = useJSON<PostalCodes>(`assets/postal_codes${showFull ? '' : '_simplified'}.json`);
  const [postalStats] = useJSON<PostalStats>('postal_stats.json');
  const postalShapes = usePostalShapes({
    postalCodes,
    priorities: postalStats?.priorities,
  });
  const [overlayPosition, setOverlayPosition] = React.useState<Coordinate | undefined>(undefined);
  const [selectedFeatures] = useSelectedPostalCode({
    postalShapes,
    selectedPostalCode,
    setOverlayPosition,
    setView,
    view,
  });
  const eventsLayer = useEventsLayer(postalStats?.events);
  const layers = React.useMemo(() => ([
    { features: Object.values(postalShapes).flat() },
    { features: selectedFeatures },
    eventsLayer,
  ]), [postalShapes, eventsLayer, selectedFeatures]);
  const mapboxTileURL = React.useMemo(
    () => getMetaContent('mapboxTileURL'),
    [],
  );
  const handleClusterSelect = React.useCallback<ClusterSelectCallback>((features, newCenter) => {
    lrs.actions.get(ShowDialog)(rdf.namedNode(`${postalCodeIri(features[0].getProperties().location).value}/events`));
    setSelectedPostalCode(undefined);
    setOverlayPosition(newCenter);
  }, [lrs, setSelectedPostalCode, setOverlayPosition]);
  const handleSelect = React.useCallback<FeatureSelectCallback>((feature, newCenter) => {
    const { postalDigits } = feature?.getProperties() || {};

    if (postalDigits) {
      setSelectedPostalCode(postalDigits);
    } else {
      const iri = feature?.getId() ? rdf.namedNode(feature.getId()) : null;

      if (iri) {
        lrs.actions.get(ShowDialog)(iri);
      }

      if (newCenter) {
        setOverlayPosition(newCenter);
        setView({
          center: newCenter,
          zoom: Math.max(view?.zoom || 0, feature ? FOCUS_ZOOM : 0),
        });
      }

      setSelectedPostalCode(undefined);
    }
  }, [setSelectedPostalCode, view.zoom]);
  const handleViewChange = React.useCallback<MapViewChangeCallback>((newCenter, newZoom) => {
    setView({
      center: newCenter,
      zoom: newZoom,
    });
  }, [setView]);

  const overlayResource = selectedPostalCode ? postalCodeIri(selectedPostalCode.toString()) : undefined;

  if (!mapboxTileURL) {
    return <LoadingCard />;
  }

  return (
    <MapCanvas
      layers={layers}
      mapboxTileURL={mapboxTileURL}
      overlayPosition={overlayPosition}
      overlayResource={overlayResource}
      variant={MapVariant.Fullscreen}
      view={view}
      onClusterSelect={handleClusterSelect}
      onSelect={handleSelect}
      onViewChange={handleViewChange}
    />
  );
};

export default GlappMap;
