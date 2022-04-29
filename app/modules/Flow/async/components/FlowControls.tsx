import {
  Button,
  Fade,
  IconButton,
} from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import * as schema from '@ontologies/schema';
import { dig, useValues } from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { FormattedMessage, useIntl } from 'react-intl';

import { SHADOW_LIGHT } from '../../../../helpers/flow';
import { frontendIRI } from '../../../../ontology/app';
import ontola from '../../../../ontology/ontola';
import { LibroTheme } from '../../../../themes/themes';
import { flowMessages } from '../../lib/messages';

export interface FlowControlsProps {
  currentIndex: number;
  fieldLength: number;
  showEnterToolTip: boolean;
  onNext: () => void;
  onPrevious: () => void;
}

const useStyles = makeStyles<LibroTheme>((theme) => ({
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
  nextButtonWrapper: {
    display: 'flex',
    justifyContent: 'center',
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
}));

export const FlowControls = ({
  currentIndex,
  fieldLength,
  showEnterToolTip,
  onNext,
  onPrevious,
}: FlowControlsProps): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();
  const [icon] = useValues(frontendIRI, dig(schema.image, ontola.imgUrl256x256));

  return (
    <div className={classes.surveyControlWrapper}>
      <img
        alt="Organization logo"
        className={classes.surveyControlOrganizationLogo}
        src={icon}
      />
      <IconButton
        aria-label={intl.formatMessage(flowMessages.previousAriaLabel)}
        color="primary"
        disabled={currentIndex === 0}
        onClick={onPrevious}
      >
        <ArrowBack />
      </IconButton>
      <div className={classes.nextButtonWrapper}>
        <Fade in={showEnterToolTip && !(currentIndex >= fieldLength)}>
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
          disabled={currentIndex >= fieldLength}
          endIcon={<ArrowForward />}
          variant="contained"
          onClick={onNext}
        >
          {currentIndex < fieldLength - 1 ?
            <FormattedMessage {...flowMessages.nextButtonLabel} /> :
            <FormattedMessage {...flowMessages.wrapUpButtonLabel} />}
        </Button>
      </div>
    </div>
  );
};
