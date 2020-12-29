import rdf, { isNode } from '@ontologies/core';
import schema from '@ontologies/schema';
import {
  ReturnType,
  useResourceLink,
  useResourceProperty,
} from 'link-redux';
import React from 'react';

import MapView, { Placement } from '../../containers/MapView';
import { tryParseFloat } from '../../helpers/numbers';
import useFormField, { InputValue } from '../../hooks/useFormField';
import fa4 from '../../ontology/fa4';
import ontola from '../../ontology/ontola';
import { FormContext } from '../Form/Form';
import { InputComponentProps } from '../FormField/FormInputs';

import HiddenRequiredInput from './HiddenRequiredInput';

import './LocationInput.scss';

const DEFAULT_ZOOM = 6.8;

const viewMapping = {
  lat: schema.latitude,
  lon: schema.longitude,
  zoom: ontola.zoomLevel,
};

interface InitialView {
  lat: number;
  lon: number;
  zoom: number;
}

const usePlacements = (lat: InputValue, lon: InputValue, zoomLevel: InputValue): [Placement[], InitialView] => {
  const { object, parentObject } = React.useContext(FormContext);
  const [parent] = useResourceProperty(parentObject, schema.isPartOf);
  const [parentLocation] = useResourceProperty(isNode(parent) ? parent : undefined, schema.location);
  const initialView = useResourceLink(
    isNode(parentLocation) ? parentLocation : undefined,
    viewMapping,
    { returnType: ReturnType.Literal },
  ) as InitialView;

  const placements = React.useMemo(() => {
    if (lat?.value && lon?.value) {
      return [{
        id: object?.value,
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

const LocationInput: React.FC<InputComponentProps> = ({
  inputValue,
  onChange,
}) => {
  const { name: latName, values: latValues, onChange: latOnChange } = useFormField({
    path: schema.latitude,
  });
  const { name: lonName, values: lonValues, onChange: lonOnChange } = useFormField({
    path: schema.longitude,
  });
  const { name: zoomLevelName, values: zoomLevelValues, onChange: zoomLevelOnChange } = useFormField({
    path: ontola.zoomLevel,
  });
  const [lat] = latValues || [];
  const [lon] = lonValues || [];
  const [zoomLevel] = zoomLevelValues || [];
  React.useEffect(() => {
    if (!inputValue?.value && lat?.value && lon?.value) {
      onChange(rdf.literal(true));
    }
  });

  const [
    placements,
    initialView,
  ] = usePlacements(lat, lon, zoomLevel);

  const storeCoordinates = (newLon: string | number, newLat: string | number) => {
    lonOnChange([rdf.literal(newLon)]);
    latOnChange([rdf.literal(newLat)]);
    const newZoom = zoomLevel?.value || (initialView as InitialView).zoom || DEFAULT_ZOOM;
    if (newZoom) {
      zoomLevelOnChange([rdf.literal(newZoom)]);
    }
  };

  return (
    <div className="LocationInput">
      <HiddenRequiredInput name={latName} value={lat?.value} />
      <HiddenRequiredInput name={lonName} value={lon?.value} />
      <HiddenRequiredInput name={zoomLevelName} value={zoomLevel?.value} />
      <MapView
        initialLat={(initialView as InitialView).lat}
        initialLon={(initialView as InitialView).lon}
        initialZoom={(initialView as InitialView).zoom}
        placements={placements}
        onMapClick={storeCoordinates}
        onZoom={(newZoom: string | number) => zoomLevelOnChange([rdf.literal(newZoom)])}
      />
    </div>
  );
};

export default LocationInput;
