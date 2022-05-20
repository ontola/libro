import {
  Grid,
  MobileStepper,
  useMediaQuery,
} from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import { LaxIdentifier } from 'link-redux';
import React from 'react';

import { calcPercentage } from '../../../../helpers/numbers';
import { BreakPoints, LibroTheme } from '../../../../themes/themes';
import { useAutoForward } from '../hooks/useAutoForward';
import { useFieldForwardRules } from '../hooks/useFieldForwardRules';
import { useFieldHashes } from '../hooks/useFieldHashes';
import { useFlowActiveField } from '../hooks/useFlowActiveField';
import { useFlowFields } from '../hooks/useFlowFields';
import { useTouchFields } from '../hooks/useTouchFields';

import { FlowBackground } from './FlowBackground';
import { FlowControls } from './FlowControls';
import { FlowInputArea } from './FlowInputArea';
import { FlowStepper } from './FlowStepper';

const useStyles = makeStyles({
  grow: {
    flexGrow: 1,
  },
  mobileStepper: {
    justifyContent: 'center',
  },
  progress: {
    flexGrow: 1,
  },
  stepperWrapper: {
    '& svg': {
      zIndex: 2,
    },
    alignSelf: 'center',
  },
  surveyWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
});

const FlowForm = (): JSX.Element | null => {
  const classes = useStyles();
  const theme = useTheme<LibroTheme>();
  const screenIsWide = useMediaQuery(theme.breakpoints.up(BreakPoints.Medium));

  const [fields, loading] = useFlowFields();
  const [
    activeField,
    activateField,
    currentIndex,
  ] = useFlowActiveField(fields, loading);

  const hashedFieldMap = useFieldHashes(fields);

  const { isAutoForwardField, isForwardedByEnter } = useFieldForwardRules(activeField);

  const activateNextField = React.useCallback(() => {
    activateField(fields[currentIndex + 1]);
  }, [fields.length, currentIndex]);

  const activatePreviousField = React.useCallback(() => {
    activateField(fields[currentIndex - 1]);
  }, [fields.length, currentIndex]);

  const onStepClick = React.useCallback((a: LaxIdentifier) => activateField(a), [currentIndex]);

  const handleSubmitBack = React.useCallback((key) => {
    activateField(hashedFieldMap.get(key));
  }, [hashedFieldMap]);

  useAutoForward(activeField, hashedFieldMap, isAutoForwardField, activateNextField);

  useTouchFields(currentIndex, fields.length);

  if (loading) {
    return null;
  }

  return (
    <div className={classes.surveyWrapper}>
      {screenIsWide && (
        <FlowBackground
          progress={calcPercentage(currentIndex, fields.length) ?? 0}
        />
      )}
      <Grid
        container
        className={classes.grow}
      >
        {screenIsWide && (
          <Grid
            item
            className={classes.stepperWrapper}
            md={1}
          >
            <FlowStepper
              currentIndex={currentIndex}
              hashedFields={hashedFieldMap}
              onStepClick={onStepClick}
            />
          </Grid>
        )}
        <Grid
          item
          md={11}
          sm={12}
        >
          <FlowInputArea
            canForwardByEnter={isForwardedByEnter}
            currentIndex={currentIndex}
            fields={fields}
            isPhone={!screenIsWide}
            onNext={activateNextField}
            onSubmitBack={handleSubmitBack}
          />
        </Grid>
      </Grid>
      {!screenIsWide && (
        <MobileStepper
          activeStep={currentIndex}
          backButton={null}
          className={classes.mobileStepper}
          nextButton={null}
          position="static"
          steps={fields.length}
          variant="dots"
        />
      )}
      <FlowControls
        currentIndex={currentIndex}
        fieldLength={fields.length}
        showEnterToolTip={isForwardedByEnter}
        onNext={activateNextField}
        onPrevious={activatePreviousField}
      />
    </div>
  );
};

export default FlowForm;
