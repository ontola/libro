import rdf from '@ontologies/core';
import * as schema from '@ontologies/schema';
import * as sh from '@ontologies/shacl';
import { useIds } from 'link-redux';
import { Coordinate } from 'ol/coordinate';
import React from 'react';

// eslint-disable-next-line no-restricted-imports
import { toPoint } from '../../async/MapView/lib/geometry';
import MapView, { Geometry, Point } from '../../containers/MapView';
import useFormField, { InputValue } from '../../hooks/useFormField';
import useInputShape from '../../hooks/useInputShape';
import { useListToArr } from '../../hooks/useListToArr';
import ontola from '../../ontology/ontola';
import { FormContext } from '../Form/Form';
import { InputComponentProps } from '../FormField/InputComponentProps';
import LinkLoader from '../Loading/LinkLoader';

import HiddenRequiredInput from './HiddenRequiredInput';

const usePlacement = (placementType: InputValue, coords: InputValue[][]): Geometry => {
  const { object } = React.useContext(FormContext);

  return React.useMemo(() => {
    const points: Point[] = [];

    for (const c of coords) {
      const p = toPoint(c);

      if (p) {
        points.push(p);
      }
    }

    return ({
      points,
      type: placementType.value,
    });
  }, [coords, object]);
};

const AreaInput: React.FC<InputComponentProps> = ({
  name,
  inputValue,
  onChange,
}) => {
  const {
    name: geometryTypeName, values: geometryTypeValues, onChange: geometryTypeOnChange,
  } = useFormField({
    path: ontola.geometryType,
  });
  const { values: longitudes, onChange: longitudesOnChange } = useFormField({
    path: schema.longitude,
  });
  const { values: latitudes, onChange: latitudesOnChange } = useFormField({
    path: schema.latitude,
  });

  const [geometryTypesShape] = useInputShape(ontola.geometryType);
  const [geometryTypesList] = useIds(geometryTypesShape, sh.shaclin);
  const [geometryTypes, geometryTypesLoading] = useListToArr(geometryTypesList);
  const [placementType] = geometryTypeValues;

  React.useEffect(() => {
    if (!placementType || placementType.value.length === 0) {
      geometryTypeOnChange([geometryTypes[0]]);
    }
  }, [placementType]);

  const coords = React.useMemo(() => (
    longitudes.length === latitudes.length && longitudes[0].value.length > 0 && latitudes[0].value.length > 0 ?
      longitudes.map(
        (longitude, index) => [longitude, latitudes[index]],
      ) : []
  ), [longitudes, latitudes]);

  React.useEffect(() => {
    if (!inputValue?.value && placementType?.value && coords.length > 0) {
      onChange(rdf.literal(true));
    }
  }, [inputValue, placementType, coords]);

  const geometry = usePlacement(placementType, coords);

  const storeCoordinates = React.useCallback( (newCoords: Coordinate[]) => {
    if (newCoords) {
      longitudesOnChange(newCoords.map((newCoord) => rdf.literal(newCoord[0])));
      latitudesOnChange(newCoords.map((newCoord) => rdf.literal(newCoord[1])));
    }
  }, [longitudesOnChange, latitudesOnChange]);

  if (geometryTypesLoading) {
    return <LinkLoader />;
  }

  return (
    <div className="AreaInput">
      <label htmlFor="type">
        Geometry type &nbsp;
      </label>
      <select
        id="geometryType"
        value={geometryTypeValues[0].value}
        onChange={(e) => {
          geometryTypeOnChange([rdf.literal(e.target.value)]);
        }}
      >
        {geometryTypes.map((geometryType) => (
          <option
            key={geometryType.value}
            value={geometryType.value}
          >
            {geometryType.value}
          </option>
        ))}
      </select>
      <HiddenRequiredInput
        name={geometryTypeName}
        value={placementType?.value}
      />
      <HiddenRequiredInput
        name={name}
        value={inputValue?.value}
      />
      <MapView
        geometry={geometry}
        geometryType={placementType.value}
        placements={[]}
        onPolygon={storeCoordinates}
      />
    </div>
  );
};

export default AreaInput;
