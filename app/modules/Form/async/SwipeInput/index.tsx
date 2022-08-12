import makeStyles from '@mui/styles/makeStyles';
import rdf from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { dig, useGlobalIds } from 'link-redux';
import React from 'react';

import { useStateMachine } from '../../../Common/hooks/useStateMachine';
import { BreakPoints, LibroTheme } from '../../../Kernel/lib/themes';
import ontola from '../../../Kernel/ontology/ontola';
import { InputValue, PermittedFormField } from '../../components/FormField/FormFieldTypes';

import {
  CardAction,
  CardState,
  cardStateMachine,
} from './CardState';
import { SwipeButtons } from './SwipeButtons';
import { SwipeCard } from './SwipeCard';

const IDLE_CARD_TIMEOUT = 1500;
const YES = rdf.literal('yes');
const NO= rdf.literal('no');

const useStyles = makeStyles<LibroTheme>((theme) => ({
  swipeInputWrapper: {
    [theme.breakpoints.down(BreakPoints.Medium)]: {
      height: 'min(20rem, 60vh)',
    },
    display: 'flex',
    flexDirection: 'column',
    height: 'min(30rem, 80vh)',
    justifyContent: 'flex-end',
    margin: 'auto',
    marginTop: 90,
    width: 'min(75vw, 25rem)',
  },
}));

const startTimeout = (func: () => void) => {
  setTimeout(() => {
    func();
  }, IDLE_CARD_TIMEOUT);
};

const initialValue = (values: InputValue[]) => {
  switch (values[0]) {
  case YES:
    return CardState.IdleYes;
  case NO:
    return CardState.IdleNo;
  default:
    return CardState.Null;
  }
};

const SwipeInput = ({
  description,
  label,
  values,
  onChange,
  onBlur,
}: PermittedFormField): JSX.Element => {
  const classes = useStyles();
  const [cardState, dispatch] = useStateMachine(cardStateMachine, initialValue(values));

  const [cover] = useGlobalIds(dig(ontola.coverPhoto, schema.contentUrl));

  React.useEffect(() => {
    switch (cardState.raw) {
    case (CardState.Idle):
      if (onBlur) {
        onBlur();
      }

      onChange([]);
      break;
    case (CardState.VotingYes):
      if (onBlur) {
        onBlur();
      }

      onChange([YES]);
      startTimeout(() => dispatch(CardAction.IdleTimeout));
      break;
    case (CardState.VotingNo):
      if (onBlur) {
        onBlur();
      }

      onChange([NO]);
      startTimeout(() => dispatch(CardAction.IdleTimeout));
      break;
    }
  }, [cardState]);

  return (
    <div className={classes.swipeInputWrapper}>
      <SwipeCard
        cardState={cardState}
        description={description ?? ''}
        dispatch={dispatch}
        image={cover?.value}
        label={label}
      />
      <SwipeButtons
        cardState={cardState}
        dispatch={dispatch}
        hideInfoButton={!cover?.value}
      />
    </div>
  );
};

export default SwipeInput;
