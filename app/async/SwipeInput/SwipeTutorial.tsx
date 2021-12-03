import Fade from '@material-ui/core/Fade';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { State } from '../../hooks/useStateMachine';
import useStoredState from '../../hooks/useStoredState';
import { LibroTheme } from '../../themes/themes';
import { swipeInputMessages } from '../../translations/messages';

import { CardState } from './CardState';

export interface SwipeTutorialProps {
  cardState: State<CardState>;
}

const useStyles = makeStyles<LibroTheme>((theme) => ({
  arrow: {
    fontSize: '5rem',
  },
  hand: {
    fontSize: '6rem',
    marginTop: '2.5rem',
  },
  text: {
    fontSize: '1.5rem',
    fontWeight: theme.typography.fontWeightBold,
    gridColumn: '1 / 4',
  },
  wrapper: {
    alignItems: 'center',
    backdropFilter: 'blur(5px)',
    backgroundColor: 'rgba(0 0 0 / 0.7)',
    color: theme.palette.common.white,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridTemplateRows: '4fr 1fr',
    height: '100%',
    justifyItems: 'center',
    position: 'absolute',
    width: '100%',
  },
}));

const parseFromString = (v: string): boolean => v === 'true';
const parseToString = (v: boolean): string => v.toString();

export const SwipeTutorial = ({ cardState }: SwipeTutorialProps): JSX.Element => {
  const classes = useStyles();

  const [_, setShowTutorial, getRaw] = useStoredState<boolean>(
    'showSwipeTutorial',
    true,
    localStorage,
    parseFromString,
    parseToString,
  );

  const triggerDismissTutorial = cardState.isAny(CardState.Dragging, CardState.VotingYes, CardState.VotingNo);

  React.useEffect(() => {
    if (triggerDismissTutorial) {
      setShowTutorial(false);
    }
  }, [triggerDismissTutorial]);

  return (
    <Fade
      unmountOnExit
      in={getRaw()}
    >
      <div className={classes.wrapper}>
        <ArrowBackIcon className={classes.arrow} />
        <TouchAppIcon className={classes.hand} />
        <ArrowForwardIcon className={classes.arrow} />
        <span className={classes.text}>
          <FormattedMessage {...swipeInputMessages.swipeTutorialText} />
        </span>
      </div>
    </Fade>
  );
};
