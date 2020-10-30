import rdf from '@ontologies/core';
import schema from '@ontologies/schema';
import {
  ReturnType,
  linkType,
  useResourceLink,
  useResourceProperty,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { tryParseFloat } from '../../helpers/numbers';
import useFormField from '../../hooks/useFormField';
import MapView from '../../containers/MapView';
import fa4 from '../../ontology/fa4';
import ontola from '../../ontology/ontola';
import { FormContext } from '../Form/Form';
import HiddenRequiredInput from '../Input/HiddenRequiredInput';

import './LocationInput.scss';

const viewMapping = {
  lat: schema.latitude,
  lon: schema.longitude,
  zoom: ontola.zoomLevel,
};

const usePlacements = (object, lat, lon, zoomLevel) => {
  const { object: formObject } = React.useContext(FormContext);
  const [parent] = useResourceProperty(formObject, schema.isPartOf);
  const [parentLocation] = useResourceProperty(parent, schema.location);
  const initialView = useResourceLink(
    parentLocation,
    viewMapping,
    { returnType: ReturnType.Literal }
  );

  const placements = React.useMemo(() => {
    if (lat && lon) {
      return [{
        id: object.value,
        image: fa4.ns('map-marker'),
        lat: tryParseFloat(lat),
        lon: tryParseFloat(lon),
        zoomLevel: tryParseFloat(zoomLevel),
      }];
    }

    return [];
  }, [lat, lon, zoomLevel, object]);

  return [placements, initialView];
};

const LocationInput = ({
  object,
  value,
  onChange,
}) => {
  const [latInput] = useFormField({
    object,
    path: schema.latitude,
  });
  const [lonInput] = useFormField({
    object,
    path: schema.longitude,
  });
  const [zoomLevelInput] = useFormField({
    object,
    path: ontola.zoomLevel,
  });
  const [lat] = latInput?.value || [];
  const [lon] = lonInput?.value || [];
  const [zoomLevel] = zoomLevelInput?.value || [];
  React.useEffect(() => {
    if (!value && lat && lon) {
      onChange(true);
    }
  });

  const [
    placements,
    initialView,
  ] = usePlacements(object, lat, lon, zoomLevel);

  const storeCoordinates = (newLat, newLon) => {
    lonInput.onChange([rdf.literal(newLat)]);
    latInput.onChange([rdf.literal(newLon)]);
    zoomLevelInput.onChange([rdf.literal(zoomLevel || initialView.zoom)]);
  };

  return (
    <div className="LocationInput">
      <HiddenRequiredInput name={latInput.name} value={lat?.value} />
      <HiddenRequiredInput name={lonInput.name} value={lon?.value} />
      <HiddenRequiredInput name={zoomLevelInput.name} value={zoomLevel?.value} />
      <MapView
        initialLat={initialView.lat}
        initialLon={initialView.lon}
        initialZoom={initialView.zoom}
        placements={placements}
        onMapClick={storeCoordinates}
        onZoom={(newZoom) => zoomLevelInput.onChange([rdf.literal(newZoom)])}
      />
    </div>
  );
};

LocationInput.propTypes = {
  object: linkType,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
};

export default LocationInput;
