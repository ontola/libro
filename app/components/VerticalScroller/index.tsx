import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React from 'react';

import { LibroTheme } from '../../themes/themes';

export const scrollBoxCID = 'CID-ScrollBox';

const transparentFix = 'rgba(255, 255, 255, 0)';

const useStyles = makeStyles<LibroTheme>((theme) => ({
  verticalScroller: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    display: 'flex',
    flex: 1,
    height: '100%',
    overflow: 'hidden',
  },
  verticalScrollerScroll: {
    MsOverflowStyle: '-ms-autohiding-scrollbar',
    backgroundAttachment: 'local, local, scroll, scroll',
    backgroundImage: `linear-gradient(to right, var(--vertical-scroller-background), ${transparentFix})
    , linear-gradient(to right, ${transparentFix}, var(--vertical-scroller-background))
    , linear-gradient(to right, ${theme.palette.transparent.xDark}, ${theme.palette.transparent.main})
    , linear-gradient(to left, ${theme.palette.transparent.xDark}, ${theme.palette.transparent.main})`,
    backgroundPosition: 'left center, right center, left center, right center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '50px 100%, 50px 100%, 10px 100%, 10px 100%',
    borderTopLeftRadius: theme.shape.borderRadius,
    display: 'flex',
    height: '100%',
    overflowX: 'auto',
    paddingLeft: '0.5rem',
    position: 'relative',
    scrollbarWidth: 'none',
    whiteSpace: 'nowrap',
    width: '100%',
  },
}));

/**
 * A bar that renders its children in a single row.
 * Shows a button when the children are larger than the max width.
 * Button toggles display as single row
 * @returns {component} Component
 */
const VerticalScroller: React.FC = ({
  children,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.verticalScroller}>
      <div className={clsx(classes.verticalScrollerScroll, scrollBoxCID, 'theme')}>
        {children}
      </div>
    </div>
  );
};

export default VerticalScroller;
