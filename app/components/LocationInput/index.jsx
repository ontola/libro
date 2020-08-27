import rdf from '@ontologies/core';
import schema from '@ontologies/schema';
import { linkType, useResourceProperty } from 'link-redux';
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

const usePlacements = (object, lat, lon, zoomLevel) => {
  const { object: formObject } = React.useContext(FormContext);
  const [parent] = useResourceProperty(formObject, schema.isPartOf);
  const [location] = useResourceProperty(parent, schema.location);

  return (
    React.useMemo(() => {
      const placements = [];

      if (lat && lon) {
        placements.push({
          id: object.value,
          image: fa4.ns('map-marker'),
          lat: tryParseFloat(lat),
          lon: tryParseFloat(lon),
          zoomLevel: tryParseFloat(zoomLevel),
        });
      }

      if (location) {
        placements.push(location);
      }

      return placements;
    }, [lat, lon, object])
  );
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

  const placements = usePlacements(object, lat, lon, zoomLevel);

  const storeCoordinates = (newLat, newLon, newZoom) => {
    lonInput.onChange([rdf.literal(newLat)]);
    latInput.onChange([rdf.literal(newLon)]);
    zoomLevelInput.onChange([rdf.literal(newZoom)]);
  };

  return (
    <div className="LocationInput">
      <HiddenRequiredInput name={latInput.name} value={lat} />
      <HiddenRequiredInput name={lonInput.name} value={lon} />
      <HiddenRequiredInput name={zoomLevelInput.name} value={zoomLevel} />
      <MapView
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
  value: PropTypes.oneOf([
    PropTypes.bool,
    PropTypes.string,
  ]),
};

export default LocationInput;
