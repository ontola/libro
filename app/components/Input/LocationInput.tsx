import { makeStyles } from '@material-ui/styles';
import rdf, { isNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import clsx from 'clsx';
import {
  ReturnType,
  useResourceLink,
  useResourceProperty,
} from 'link-redux';
import React from 'react';

import MapView, { Placement } from '../../containers/MapView';
import { SHADOW_LIGHT } from '../../helpers/flow';
import { tryParseFloat } from '../../helpers/numbers';
import useFormField, { InputValue } from '../../hooks/useFormField';
import fa4 from '../../ontology/fa4';
import ontola from '../../ontology/ontola';
import { LibroTheme } from '../../themes/themes';
import { FormContext, FormTheme } from '../Form/Form';
import { InputComponentProps } from '../FormField/InputComponentProps';

import HiddenRequiredInput from './HiddenRequiredInput';

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

const useStyles = makeStyles<LibroTheme>((theme) => ({
  locationFlow: {
    [theme.breakpoints.up('md')]: {
      width: 'min(80vw, 600px)',
    },
    borderRadius: theme.shape.borderRadius,
    boxShadow: SHADOW_LIGHT,
    height: '16rem',
    overflow: 'hidden',
    width: '90vw',
  },
  locationInput: {
    flex: 1,
    marginBottom: '1rem',
    position: 'relative',
  },
}));

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
  const { theme } = React.useContext(FormContext);
  const classes = useStyles();
  const className = clsx({
    [classes.locationInput]: true,
    [classes.locationFlow]: theme === FormTheme.Flow,
  });

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
    const newZoom = zoomLevel?.value || initialView.zoom || DEFAULT_ZOOM;

    if (newZoom) {
      zoomLevelOnChange([rdf.literal(newZoom)]);
    }
  };

  return (
    <div className={className}>
      <HiddenRequiredInput
        name={latName}
        value={lat?.value}
      />
      <HiddenRequiredInput
        name={lonName}
        value={lon?.value}
      />
      <HiddenRequiredInput
        name={zoomLevelName}
        value={zoomLevel?.value}
      />
      <MapView
        initialLat={initialView.lat}
        initialLon={initialView.lon}
        initialZoom={initialView.zoom}
        placements={placements}
        onMapClick={storeCoordinates}
        onZoom={(newZoom: string | number) => zoomLevelOnChange([rdf.literal(newZoom)])}
      />
    </div>
  );
};

export default LocationInput;
