import rdf from '@ontologies/core';
import {
  useLRS,
  useResourceProperty,
} from 'link-redux';
import { Coordinate } from 'ol/coordinate';
import { fromLonLat } from 'ol/proj';
import React from 'react';

import { tryParseFloat } from '../../helpers/numbers';
import useJSON from '../../hooks/useJSON';
import app from '../../ontology/app';
import teamGL from '../../ontology/teamGL';
import {
  GlappMapProps,
  PostalStats,
} from '../../containers/GroenLinks/GlappMap';
import { postalCodeIri } from '../../views/GroenLinks/Glapp/helpers';
import MapCanvas from '../MapView/MapCanvas';
import { FOCUS_ZOOM, ViewProps } from '../MapView/useMap';

import useEventsLayer from './useEventsLayer';
import usePostalShapes, { PostalCodes } from './usePostalShapes';
import useSelectedPostalCode from './useSelectedPostalCode';

const FULL_POSTAL_LEVEL = 8.6;

const GlappMap: React.FC<GlappMapProps> = ({
  selectedPostalCode,
  setSelectedPostalCode,
}) => {
  const lrs = useLRS();
  const [zoomProp] = useResourceProperty(app.c_a, teamGL.zoom);
  const zoom = tryParseFloat(zoomProp);
  const [latProp] = useResourceProperty(app.c_a, teamGL.centerLat);
  const centerLat = tryParseFloat(latProp);
  const [lonProp] = useResourceProperty(app.c_a, teamGL.centerLon);
  const centerLon = tryParseFloat(lonProp);
  const [view, setView] = React.useState<ViewProps>({
    center: centerLon && centerLat ? fromLonLat([centerLon, centerLat]) : undefined,
    zoom,
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
  const handleClusterSelect = React.useCallback((features, newCenter) => {
    lrs.actions.ontola.showDialog(rdf.namedNode(`${postalCodeIri(features[0].getProperties().location).value}/events`));
    setSelectedPostalCode(undefined);
    setOverlayPosition(newCenter);
  }, [lrs, setSelectedPostalCode, setOverlayPosition]);
  const handleSelect = React.useCallback((feature, newCenter) => {
    const { postalDigits } = feature?.getProperties() || {};

    if (postalDigits) {
      setSelectedPostalCode(postalDigits);
    } else {
      const iri = feature?.getId() ? rdf.namedNode(feature.getId()) : null;

      if (iri) {
        lrs.actions.ontola.showDialog(iri);
      }

      setOverlayPosition(newCenter);
      setView({
        center: newCenter,
        zoom: Math.max(view?.zoom || 0, feature ? FOCUS_ZOOM : 0),
      });
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

  return (
    <MapCanvas
      large
      layers={layers}
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
