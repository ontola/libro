import { makeStyles } from '@mui/styles';
import rdf from '@ontologies/core';
import * as schema from '@ontologies/schema';
import clsx from 'clsx';
import React from 'react';
import { useIntl } from 'react-intl';

import { SHADOW_LIGHT } from '../../../../../helpers/flow';
import { useFormFieldForPath } from '../../../../../hooks/useFormFieldForPath';
import ControlledMap, { MapVariant } from '../../../components/ControlledMap';
import ontola from '../../../../../ontology/ontola';
import { BreakPoints, LibroTheme } from '../../../../../themes/themes';
import { hiddenRequiredInputErrors } from '../../../../../translations/messages';
import { FormTheme, formContext } from '../../../../../components/Form/FormContext';
import { formFieldContext } from '../../../../../components/FormField/FormFieldContext';
import { InputComponentProps } from '../../../../../components/FormField/FormFieldTypes';
import HiddenRequiredInput from '../../../../../components/Input/HiddenRequiredInput';

import { useGeometryInput } from './lib/useGeometryInput';
import { useIntialView } from './lib/useInitialView';

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

  const latInput = useFormFieldForPath(schema.latitude);
  const lonInput = useFormFieldForPath(schema.longitude);
  const zoomLevelInput = useFormFieldForPath(ontola.zoomLevel);
  const [lat] = latInput.values || [];
  const [lon] = lonInput.values || [];
  const [zoomLevel] = zoomLevelInput.values || [];

  const handleZoom = React.useCallback(
    (newZoom: string | number) => zoomLevelInput.onChange([rdf.literal(newZoom)]),
    [zoomLevelInput],
  );

  React.useEffect(() => {
    if (!inputValue?.value && lat?.value && lon?.value) {
      onChange(rdf.literal(true));
    }
  });

  const initialView = useIntialView();
  const [geometryLayers, handleInteraction] = useGeometryInput(latInput, lonInput, zoomLevelInput);

  return (
    <div className={className}>
      {required && (
        <React.Fragment>
          <HiddenRequiredInput
            customErrorMessage={intl.formatMessage(hiddenRequiredInputErrors.location)}
            name={latInput.name}
            value={lat?.value}
          />
          <HiddenRequiredInput
            customErrorMessage={intl.formatMessage(hiddenRequiredInputErrors.location)}
            name={lonInput.name}
            value={lon?.value}
          />
          <HiddenRequiredInput
            customErrorMessage={intl.formatMessage(hiddenRequiredInputErrors.zoomLevel)}
            name={zoomLevelInput.name}
            value={zoomLevel?.value}
          />
        </React.Fragment>
      )}
      <ControlledMap
        initialLat={initialView.lat}
        initialLon={initialView.lon}
        initialZoom={initialView.zoom}
        layers={geometryLayers}
        variant={theme === FormTheme.Flow ? MapVariant.Flow : MapVariant.Default}
        onInteraction={handleInteraction}
        onZoom={handleZoom}
      />
    </div>
  );
};

export default LocationInput;
