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
import { Feature, View } from 'ol';
import GeometryType from 'ol/geom/GeometryType';
import { toLonLat } from 'ol/proj';

// eslint-disable-next-line no-restricted-imports
import { toFeature } from '../../modules/MapView/async/lib/geometry';
import MapView, {
  Geometry,
  MapVariant,
  Placement,
} from '../../modules/MapView/components/MapView';
import { SHADOW_LIGHT } from '../../helpers/flow';
import { tryParseFloat } from '../../helpers/numbers';
import { useFormFieldForPath } from '../../hooks/useFormFieldForPath';
import fa4 from '../../ontology/fa4';
import ontola from '../../ontology/ontola';
import { BreakPoints, LibroTheme } from '../../themes/themes';
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
    [theme.breakpoints.up(BreakPoints.Medium)]: {
      width: 'min(80vw, 600px)',
    },
    [theme.breakpoints.down(BreakPoints.Medium)]: {
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

const usePlacements = (latInput: InputValue, lonInput: InputValue): [Placement[], InitialView] => {
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
      }];
    }

    return [];
  }, [latInput, lonInput, object]);

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

  const [tempCoord, setTempCoord] = React.useState<{lon: number, lat: number}>();

  React.useEffect(() => {
    if (!inputValue?.value && lat?.value && lon?.value) {
      onChange(rdf.literal(true));
    }
  });

  const [
    placements,
    initialView,
  ] = usePlacements(lat, lon);

  const setCoordinates = (newLon: number, newLat: number) => {
    setTempCoord({
      lat: newLat,
      lon: newLon,
    });
  };

  const storeCoordinates = (feature: Feature | undefined) => {
    if (feature?.getGeometry()?.getType() !== GeometryType.POINT) {
      lonOnChange([rdf.literal(tempCoord!.lon)]);
      latOnChange([rdf.literal(tempCoord!.lat)]);
    }
  };

  const mockGeometry: Geometry = {
    points: [{
      lat: 52.0907,
      lon: 5.1214,
    }, {
      lat: 52.0907,
      lon: 6.1214,
    }, {
      lat: 53.0907,
      lon: 5.1214,
    }, {
      lat: 52.0907,
      lon: 5.1214,
    }],
    type: GeometryType.POLYGON,
  };

  const boundingArea = toFeature(mockGeometry);
  const extent = boundingArea.getGeometry()?.getExtent();

  const view = new View();

  if (extent) {
    view.fit(extent, {
      padding: [10, 10, 10, 10],
      size: [844, 256],
    });
  }

  const center = view.getCenter();
  const [initialLon, initialLat] = center ? toLonLat(center) : [null, null];
  const initialZoom = view.getZoom();

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
      <HiddenRequiredInput
        name={latName}
        value={lat?.value}
      />
      <HiddenRequiredInput
        name={lonName}
        value={lon?.value}
      />
      <MapView
        boundingArea={boundingArea}
        initialLat={initialLat ?? initialView.lat}
        initialLon={initialLon ?? initialView.lon}
        initialZoom={initialZoom ?? initialView.zoom}
        placements={placements}
        variant={theme === FormTheme.Flow ? MapVariant.Flow : MapVariant.Default}
        onMapClick={setCoordinates}
        onSelect={storeCoordinates}
        onZoom={(newZoom: string | number) => zoomLevelOnChange([rdf.literal(newZoom)])}
      />
    </div>
  );
};

export default LocationInput;
