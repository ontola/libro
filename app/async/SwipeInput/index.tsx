import makeStyles from '@mui/styles/makeStyles';
import rdf from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { dig, useGlobalIds } from 'link-redux';
import React from 'react';

import { PermittedFormField } from '../../components/FormField/FormFieldTypes';
import { useStateMachine } from '../../hooks/useStateMachine';
import ontola from '../../ontology/ontola';
import { LibroTheme } from '../../themes/themes';

import {
  CardAction,
  CardState,
  cardStateMachine,
} from './CardState';
import { SwipeButtons } from './SwipeButtons';
import { SwipeCard } from './SwipeCard';

const IDLE_CARD_TIMEOUT = 1500;

const useStyles = makeStyles<LibroTheme>((theme) => ({
  swipeInputWrapper: {
    [theme.breakpoints.down('sm')]: {
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

const SwipeInput = ({
  description,
  label,
  onChange,
}: PermittedFormField): JSX.Element => {
  const classes = useStyles();
  const [cardState, dispatch] = useStateMachine(cardStateMachine, CardState.Idle);

  const [cover] = useGlobalIds(dig(ontola.coverPhoto, schema.contentUrl));

  React.useEffect(() => {
    switch (cardState.raw) {
    case (CardState.Idle):
      onChange([]);
      break;
    case (CardState.VotingYes):
      onChange([rdf.literal('yes')]);
      startTimeout(() => dispatch(CardAction.IdleTimeout));
      break;
    case (CardState.VotingNo):
      onChange([rdf.literal('no')]);
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
