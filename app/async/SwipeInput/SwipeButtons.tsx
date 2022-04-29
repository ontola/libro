import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import React from 'react';
import { useIntl } from 'react-intl';

import { Dispatcher, State } from '../../hooks/useStateMachine';
import { LibroTheme } from '../../themes/themes';
import { swipeInputMessages } from '../../translations/messages';

import { CardAction, CardState } from './CardState';

export type ButtonClickHandler = (button: CardState) => void;

export interface SwipeButtonsProps {
  cardState: State<CardState>;
  dispatch: Dispatcher<CardAction>;
  hideInfoButton?: boolean;
}

const filled = (theme: LibroTheme) => ({
  '& > *': {
    color: theme.palette.common.white,
    transition: 'color 150ms ease',
  },
  backgroundColor: 'currentColor',
});

const useStyles = makeStyles<LibroTheme>((theme) => ({
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '3rem',
  },
  filledButton: filled(theme),
  iconButton: {
    '&:hover, &:focus': filled(theme),
    border: '2px solid currentColor',
    color: theme.palette.grey.main,
    opacity: 1,
    transition: 'color 150ms ease, background-color 150ms ease',
  },
  no: {
    //@ts-ignore
    color: theme.palette.brown.main,
  },
  yes: {
    //@ts-ignore
    color: theme.palette.green.main,
  },
}));

export const SwipeButtons = ({
  cardState,
  dispatch,
  hideInfoButton,
}: SwipeButtonsProps): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();

  const handleNoClick = React.useCallback(() => {
    dispatch(CardAction.VoteNoButton);
  }, [cardState, dispatch]);

  const handleYesClick = React.useCallback(() => {
    dispatch(CardAction.VoteYesButton);
  }, [cardState, dispatch]);

  const handleInfoClick = React.useCallback(() => {
    dispatch(CardAction.ShowInfoButton);
  }, [cardState, dispatch]);

  const noButtonClass = clsx({
    [classes.iconButton]: true,
    [classes.no]: true,
    [classes.filledButton]: cardState.isAny(CardState.VotingNo, CardState.IdleNo),
  });

  const yesButtonClass = clsx({
    [classes.iconButton]: true,
    [classes.yes]: true,
    [classes.filledButton]: cardState.isAny(CardState.VotingYes, CardState.IdleYes),
  });

  const iconButtonClasses = clsx({
    [classes.iconButton]: true,
    [classes.filledButton]: cardState.is(CardState.ShowInfoFace),
  });

  const infoState = cardState.isAny(CardState.ShowInfoFace, CardState.FlipToFront);

  return (
    <div className={classes.buttonWrapper}>
      <IconButton
        aria-label={intl.formatMessage(swipeInputMessages.voteNoButtonLabel)}
        className={noButtonClass}
        disabled={infoState}
        onClick={handleNoClick}
      >
        <ThumbDownIcon />
      </IconButton>
      {!hideInfoButton && (
        <IconButton
          aria-label={intl.formatMessage(swipeInputMessages.infoButtonLabel)}
          className={iconButtonClasses}
          onClick={handleInfoClick}
        >
          {infoState ? <CloseIcon /> : <InfoIcon />}
        </IconButton>
      )}
      <IconButton
        aria-label={intl.formatMessage(swipeInputMessages.voteYesButtonLabel)}
        className={yesButtonClass}
        disabled={infoState}
        onClick={handleYesClick}
      >
        <ThumbUpIcon />
      </IconButton>
    </div>
  );
};
