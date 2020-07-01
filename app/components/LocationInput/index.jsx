import rdf from '@ontologies/core';
import schema from '@ontologies/schema';
import { linkType, useLRS } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { tryParseFloat } from '../../helpers/numbers';
import useFormField from '../../hooks/useFormField';
import MapView from '../../containers/MapView';
import fa4 from '../../ontology/fa4';

import './LocationInput.scss';

const usePlacements = (object, lat, lon) => (
  React.useMemo(() => {
    let renderSubject = false;
    const placements = [];

    if (lat && lon) {
      placements.push({
        id: object.value,
        image: fa4.ns('map-marker'),
        lat: tryParseFloat(lat),
        lon: tryParseFloat(lon),
      });
    } else if (object.termType === 'NamedNode') {
      renderSubject = true;
    }

    return [renderSubject, placements];
  }, [lat, lon, object])
);

const LocationInput = ({
  object,
  value,
  onChange,
}) => {
  const lrs = useLRS();
  const [latInput] = useFormField({
    object,
    path: schema.latitude,
  });
  const [lonInput] = useFormField({
    object,
    path: schema.longitude,
  });
  const [lat] = latInput?.value || [];
  const [lon] = lonInput?.value || [];
  React.useEffect(() => {
    if (!value && lat && lon) {
      onChange(true);
    }
  });

  const [renderSubject, placements] = usePlacements(object, lat, lon);

  const storeCoordinates = (e) => {
    lonInput.onChange([rdf.literal(e[0])]);
    latInput.onChange([rdf.literal(e[1])]);
  };

  return (
    <div className="LocationInput">
      <input
        required
        className="hidden-field"
        id={latInput.name}
        name={latInput.name}
        type="text"
        value={lat}
      />
      <input
        required
        className="hidden-field"
        id={lonInput.name}
        name={lonInput.name}
        type="text"
        value={lon}
      />
      <MapView
        lrs={lrs}
        placements={placements}
        renderSubject={renderSubject}
        subject={object}
        onMapClick={storeCoordinates}
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
