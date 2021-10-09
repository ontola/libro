import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MobileStepper from '@material-ui/core/MobileStepper';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ArrowBack, ArrowForward } from '@material-ui/icons';
import { makeStyles, useTheme } from '@material-ui/styles';
import { SomeTerm } from '@ontologies/core';
import * as rdf from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import {
  Resource,
  dig,
  useIds,
  useValues,
} from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { FormattedMessage, useIntl } from 'react-intl';

import { SHADOW_LIGHT } from '../../../../helpers/flow';
import { calcPercentage } from '../../../../helpers/numbers';
import { frontendIRI } from '../../../../ontology/app';
import form from '../../../../ontology/form';
import ontola from '../../../../ontology/ontola';
import { LibroTheme } from '../../../../themes/themes';
import { flowMessages } from '../../lib/messages';
import { AUTO_FORWARDED_FIELDS, useAutoForward } from '../hooks/useAutoForward';
import { useFlowActiveField } from '../hooks/useFlowActiveField';
import { useFlowFields } from '../hooks/useFlowFields';
import { useInvalidField } from '../hooks/useInvalidField';

import { SubmissionPage } from './SubmissionPage';
import { FlowStepper } from './FlowStepper';
import { FlowBackground } from './FlowBackground';
import { FlowAnimation } from './FlowAnimation';

export const MANUAlLY_FORWARDED_FIELDS = [
  form.TextAreaInput.value,
  form.MarkdownInput.value,
];

const useStyles = makeStyles<LibroTheme>((theme) => ({
  centeredInputs: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
  },
  enterWrapper: {
    alignItems: 'center',
    bottom: '4.5rem',
    color: '#5e5e5e',
    display: 'flex',
    fontSize: '1.1rem',
    fontWeight: theme.typography.fontWeightMedium,
    gap: '.6rem',
    position: 'absolute',
  },
  grow: {
    flexGrow: 1,
  },
  inputWrapper: {
    [theme.breakpoints.down('sm')]: {
      padding: '1rem',
    },
    maxHeight: '95vh',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    position: 'absolute',
  },
  mobileStepper: {
    justifyContent: 'center',
  },
  nextButtonWrapper: {
    display: 'flex',
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
  surveyControlOrganizationLogo: {
    borderRadius: theme.shape.borderRadius,
    boxShadow: SHADOW_LIGHT,
    height: '3.1rem',
    justifySelf: 'flex-start',
    marginLeft: '12px',
    marginRight: 'auto',
    zIndex: 2,
  },
  surveyControlWrapper: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'flex-end',
  },
  surveyWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
}));

const forwardByEnter = (type: SomeTerm) => (
  type && !MANUAlLY_FORWARDED_FIELDS.includes(type.value) && !AUTO_FORWARDED_FIELDS.includes(type.value)
);

const FlowForm = (): JSX.Element | null => {
  const intl = useIntl();

  const classes = useStyles();
  const theme = useTheme<LibroTheme>();
  const matchMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const [fields, loading] = useFlowFields();
  const [activeField, activateField, currentIndex] = useFlowActiveField(fields, loading);
  const invalidField = useInvalidField(fields);
  const [icon] = useValues(frontendIRI, dig(schema.image, ontola.imgUrl256x256));
  const [type] = useIds(activeField, rdf.type);

  const activateNextField = React.useCallback(() => {
    activateField(fields[currentIndex + 1]);
  }, [fields, currentIndex, activateField]);
  const activatePreviousField = React.useCallback(() => {
    activateField(fields[currentIndex - 1]);
  }, [fields, currentIndex, activateField]);
  const handleOnKeyDown: React.KeyboardEventHandler<HTMLDivElement> = React.useCallback((e) => {
    if (forwardByEnter(type) && e.key === 'Enter') {
      e.preventDefault();
      activateNextField();
    }
  }, [activateNextField]);
  const handleSubmitBack = React.useCallback(() => {
    activateField(invalidField ?? fields[0]);
  }, [activateField, invalidField, fields[0]]);

  useAutoForward(activeField, activateNextField);

  if (loading) {
    return null;
  }

  return (
    <div className={classes.surveyWrapper}>
      {matchMdUp && (
        <FlowBackground
          checkmarks={!invalidField}
          progress={calcPercentage(currentIndex, fields.length) ?? 0}
        />
      )}
      <Grid
        container
        className={classes.grow}
      >
        {matchMdUp && (
          <Grid
            item
            className={classes.stepperWrapper}
            md={1}
          >
            <FlowStepper
              currentIndex={currentIndex}
              pages={fields}
              onStepClick={activateField}
            />
          </Grid>
        )}
        <Grid
          item
          md={11}
          sm={12}
        >
          <div className={classes.centeredInputs}>
            {fields.map((page, index) => (
              <FlowAnimation
                componentIndex={index}
                currentIndex={currentIndex}
                isPhone={!matchMdUp}
                key={page.value}
              >
                <div
                  className={classes.inputWrapper}
                  onKeyDown={handleOnKeyDown}
                >
                  <Resource subject={page} />
                </div>
              </FlowAnimation>
            ))}
            <FlowAnimation
              componentIndex={fields.length}
              currentIndex={currentIndex}
              isPhone={!matchMdUp}
            >
              <span>
                <SubmissionPage
                  formInvalid={!!invalidField}
                  onBack={handleSubmitBack}
                />
              </span>
            </FlowAnimation>
          </div>
        </Grid>
      </Grid>
      {!matchMdUp && (
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
      <div className={classes.surveyControlWrapper}>
        <img
          alt=""
          className={classes.surveyControlOrganizationLogo}
          src={icon}
        />
        <IconButton
          aria-label={intl.formatMessage(flowMessages.previousAriaLabel)}
          color="primary"
          disabled={currentIndex === 0}
          onClick={activatePreviousField}
        >
          <ArrowBack />
        </IconButton>
        <div className={classes.nextButtonWrapper}>
          <Fade in={!(currentIndex >= fields.length) && forwardByEnter(type)}>
            <div className={classes.enterWrapper}>
              <FontAwesome
                name="level-down"
                rotate={90}
              />
              <FormattedMessage {...flowMessages.enterButtonLabel} />
            </div>
          </Fade>
          <Button
            color="primary"
            disabled={currentIndex >= fields.length}
            endIcon={<ArrowForward />}
            variant="contained"
            onClick={activateNextField}
          >
            {currentIndex < fields.length - 1 ?
              <FormattedMessage {...flowMessages.nextButtonLabel} /> :
              <FormattedMessage {...flowMessages.wrapUpButtonLabel} />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FlowForm;
