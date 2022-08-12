import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import Fade from '@mui/material/Fade';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { LibroTheme } from '../../../Kernel/lib/themes';
import { swipeInputMessages } from '../../../../translations/messages';
import { State } from '../../../Common/hooks/useStateMachine';
import useStoredState from '../../../Common/hooks/useStoredState';
import { formContext } from '../../components/Form/FormContext';

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

export const SwipeTutorial = ({ cardState }: SwipeTutorialProps): JSX.Element | null => {
  const classes = useStyles();

  const { formID } = React.useContext(formContext);

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

  if (!formID) {
    return null;
  }

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
