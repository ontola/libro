import rdf from '@ontologies/core';
import { useFields, useLRS } from 'link-redux';
import { Coordinate } from 'ol/coordinate';
import { fromLonLat } from 'ol/proj';
import React from 'react';

import {
  ClusterSelectCallback,
  FeatureSelectCallback,
  ViewProps, 
} from '../../../../containers/MapView';
import { getMetaContent } from '../../../../helpers/dom';
import { tryParseFloat } from '../../../../helpers/numbers';
import useJSON from '../../../../hooks/useJSON';
import app from '../../../../ontology/app';
import teamGL from '../../../../ontology/teamGL';
import {
  GlappMapProps,
  PostalStats,
} from '../../components/GlappMap';
import { postalCodeIri } from '../../views/Glapp/helpers';
import MapCanvas from '../../../../async/MapView/components/MapCanvas';
import { FOCUS_ZOOM } from '../../../../async/MapView/hooks/useMap';
import useEventsLayer from '../hooks/useEventsLayer';
import usePostalShapes, { PostalCodes } from '../hooks/usePostalShapes';
import useSelectedPostalCode from '../hooks/useSelectedPostalCode';
import { LoadingCard } from '../../../../components/Loading';

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
  const postalCodes = useJSON<PostalCodes>(`assets/postal_codes${showFull ? '' : '_simplified'}.json`);
  const postalStats = useJSON<PostalStats>('postal_stats.json');
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
    lrs.actions.ontola.showDialog(rdf.namedNode(`${postalCodeIri(features[0].getProperties().location).value}/events`));
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
        lrs.actions.ontola.showDialog(iri);
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
  const handleViewChange = React.useCallback((newCenter, newZoom) => {
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
      large
      layers={layers}
      mapboxTileURL={mapboxTileURL}
      overlayPosition={overlayPosition}
      overlayResource={overlayResource}
      view={view}
      onClusterSelect={handleClusterSelect}
      onSelect={handleSelect}
      onViewChange={handleViewChange}
    />
  );
};

export default GlappMap;
