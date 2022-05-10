import { makeStyles } from '@mui/styles';
import rdf from '@ontologies/core';
import * as schema from '@ontologies/schema';
import clsx from 'clsx';
import {
  ReturnType,
  dig,
  useIds,
  useResourceLink,
} from 'link-redux';
import React from 'react';
import { useIntl } from 'react-intl';

import MapView, {
  MapVariant,
  Placement,
} from '../../modules/MapView/components/MapView';
import { SHADOW_LIGHT } from '../../helpers/flow';
import { tryParseFloat } from '../../helpers/numbers';
import { useFormFieldForPath } from '../../hooks/useFormFieldForPath';
import { DEFAULT_ZOOM } from '../../modules/MapView/lib/settings';
import fa4 from '../../ontology/fa4';
import ontola from '../../ontology/ontola';
import { LibroTheme } from '../../themes/themes';
import { hiddenRequiredInputErrors } from '../../translations/messages';
import { FormTheme, formContext } from '../Form/FormContext';
import { formFieldContext } from '../FormField/FormFieldContext';
import { InputComponentProps, InputValue } from '../FormField/FormFieldTypes';

import HiddenRequiredInput from './HiddenRequiredInput';

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
    [theme.breakpoints.down('md')]: {
      maxHeight: '40vh',
    },
    borderRadius: theme.shape.borderRadius,
    boxShadow: SHADOW_LIGHT,
    height: '35rem',
    maxHeight: '70vh',
    overflow: 'hidden',
  },
  locationInput: {
    flex: 1,
    marginBottom: '1rem',
    position: 'relative',
  },
}));

const usePlacements = (latInput: InputValue, lonInput: InputValue, zoomLevel: InputValue): [Placement[], InitialView] => {
  const { object, parentObject } = React.useContext(formContext);
  const [parentLocation] = useIds(parentObject, dig(schema.isPartOf, schema.location));
  const initialView = useResourceLink(
    parentLocation,
    viewMapping,
    { returnType: ReturnType.Literal },
  ) as InitialView;

  const placements = React.useMemo(() => {
    const lat = tryParseFloat(latInput);
    const lon = tryParseFloat(lonInput);
    const id = object?.value;

    if (lat && lon && id) {
      return [{
        id,
        image: fa4.ns('map-marker'),
        lat,
        lon,
        zoomLevel: tryParseFloat(zoomLevel),
      }];
    }

    return [];
  }, [latInput, lonInput, zoomLevel, object]);

  return [placements, initialView];
};

const LocationInput: React.FC<InputComponentProps> = ({
  inputValue,
  onChange,
}) => {
  const intl = useIntl();
  const { theme } = React.useContext(formContext);
  const { fieldShape: { required } } = React.useContext(formFieldContext);

  const classes = useStyles();

  const className = clsx({
    [classes.locationInput]: true,
    [classes.locationFlow]: theme === FormTheme.Flow,
  });

  const { name: latName, values: latValues, onChange: latOnChange } = useFormFieldForPath(schema.latitude);
  const { name: lonName, values: lonValues, onChange: lonOnChange } = useFormFieldForPath(schema.longitude);
  const { name: zoomLevelName, values: zoomLevelValues, onChange: zoomLevelOnChange } = useFormFieldForPath(ontola.zoomLevel);
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
    const newZoom = zoomLevel?.value || DEFAULT_ZOOM;

    if (newZoom) {
      zoomLevelOnChange([rdf.literal(newZoom)]);
    }
  };

  return (
    <div className={className}>
      {required && (
        <React.Fragment>
          <HiddenRequiredInput
            customErrorMessage={intl.formatMessage(hiddenRequiredInputErrors.location)}
            name={latName}
            value={lat?.value}
          />
          <HiddenRequiredInput
            customErrorMessage={intl.formatMessage(hiddenRequiredInputErrors.location)}
            name={lonName}
            value={lon?.value}
          />
          <HiddenRequiredInput
            customErrorMessage={intl.formatMessage(hiddenRequiredInputErrors.zoomLevel)}
            name={zoomLevelName}
            value={zoomLevel?.value}
          />
        </React.Fragment>
      )}
      <MapView
        initialLat={initialView.lat}
        initialLon={initialView.lon}
        initialZoom={initialView.zoom}
        placements={placements}
        variant={theme === FormTheme.Flow ? MapVariant.Flow : MapVariant.Default}
        onMapClick={storeCoordinates}
        onZoom={(newZoom: string | number) => zoomLevelOnChange([rdf.literal(newZoom)])}
      />
    </div>
  );
};

export default LocationInput;
