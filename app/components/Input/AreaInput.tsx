import rdf from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { Coordinate } from 'ol/coordinate';
import React from 'react';

// eslint-disable-next-line no-restricted-imports
import { toPoint } from '../../async/MapView/lib/geometry';
import MapView, { Geometry, Point } from '../../containers/MapView';
import useFormField, { InputValue } from '../../hooks/useFormField';
import argu from '../../ontology/argu';
import { FormContext } from '../Form/Form';
import { InputComponentProps } from '../FormField/InputComponentProps';

import HiddenRequiredInput from './HiddenRequiredInput';

const usePlacement = (placementType: InputValue, coords: InputValue[]): Geometry => {
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
  inputValue,
  onChange,
}) => {
  const { name: placementTypeName, values: placementTypeValues, onChange: placementTypeOnChange } = useFormField({
    path: argu.placementType,
  });
  const { name: coordsName, values: coords, onChange: coordsOnChange } = useFormField({
    path: schema.longitude,
  });
  const geometryElement = document.getElementById('geometryType') as HTMLInputElement;

  if (geometryElement) {
    geometryElement.onchange = () => placementTypeOnChange([rdf.literal(geometryElement.value)]);

    if (!placementTypeValues[0].value) {
      placementTypeOnChange([rdf.literal(geometryElement.value)]);
    }
  }

  const [placementType] = placementTypeValues;
  React.useEffect(() => {
    if (!inputValue?.value && placementType?.value && coords.length > 1) {
      onChange(rdf.literal(true));
    }
  });

  const geometry = usePlacement(placementType, coords);

  const storeCoordinates = ( newCoords: Coordinate[]) => {
    if (newCoords) {
      coordsOnChange(newCoords.map((newCoord) => rdf.literal(newCoord.join(','))));
    }
  };

  return (
    <div className="AreaInput">
      <label htmlFor="type">
        Geometry type &nbsp;
      </label>
      <select id="geometryType">
        <option value="Circle">
          Circle
        </option>
        <option value="Polygon">
          Polygon
        </option>
      </select>
      <HiddenRequiredInput
        name={placementTypeName}
        value={placementType?.value}
      />
      {coords.map((coord, index) => (
        <HiddenRequiredInput
          key={`${coordsName}-${index}`}
          name={coordsName}
          value={coord?.value}
        />
      ))}
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
