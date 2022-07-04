import { createStyles } from '@mui/styles';

import { LibroTheme } from '../../theme/types';
import { cardContentClassIdentifier } from '../../components/Card/CardContent';
import { headingCID } from '../../components/Heading';

const CARD_BOTTOM_MARGIN = 5;

export const cardClassIdentifier = 'CID-Card';
export const cardFixedClassIdentifier = 'CID-CardFixed';
export const collapseTextToggleCID = 'CID-CollapseTextToggle';

export const shineStyles = createStyles({
  '@keyframes shineAnimation': {
    '0%': {
      boxShadow: '0 0 0 rgba(0 0 0 / 0)',
    },
    '40%': {
      boxShadow: '0 0 20px 1px rgba(0 0 0 / .3)',
    },
    '60%': {
      boxShadow: '0 0 20px 1px rgba(0 0 0 / .3)',
    },
    '100%': {
      boxShadow: '0 0 0 rgba(0 0 0 / 0)',
    },
  },
  shine: {
    animation: '$shineAnimation 2s 1',
    animationDelay: '.3s',
    zIndex: 1,
  },
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const cardStyles = (theme: LibroTheme) => createStyles({
  card: {
    '&:empty': {
      border: 0,
    },
    backgroundColor: theme.palette.background.paper,
    border: theme.greyBorder,
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 0 25px rgba(0 0 0 / .06)',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(CARD_BOTTOM_MARGIN),
    marginTop: theme.spacing(CARD_BOTTOM_MARGIN),
    [`& .${headingCID}`]: {
      marginTop: '0.25rem',
    },
  },
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const cardFixedStyles = (theme: LibroTheme) => createStyles({
  fixed: {
    [`& .${cardContentClassIdentifier}`]: {
      flexShrink: 1,
      // [AOD-174][AOD-179] Hides overflowing text, should not flex due to rendering in Chrome
      overflow: 'hidden',
      width: '100%',
    },
    '& > a': {
      display: 'flex',
      flex: '1 1',
      flexDirection: 'column',
      overflow: 'hidden',
    },
    '&:hover': {
      border: `solid 1px ${theme.palette.grey.light}`,
    },
    height: '16em',
    margin: 0,
    width: '100%',
  },
});
