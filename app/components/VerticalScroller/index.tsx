import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import React from 'react';

import { LibroTheme } from '../../themes/themes';

export const scrollBoxCID = 'CID-ScrollBox';
export const detailBarsOverlap = '1rem';

const useStyles = makeStyles<LibroTheme>((theme) => ({
  verticalScroller: {
    '@media (hover: hover)': {
      '&::-webkit-scrollbar': {
        height: 'var(--scrollbar-height)',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: theme.palette.grey.light,
        borderRadius: 'var(--scrollbar-height)',
      },
      '--scrollbar-height': '3px',
      MsOverflowStyle: '-ms-autohiding-scrollbar',
      paddingTop: 'var(--scrollbar-height)',
      scrollbarWidth: 'none',
    },
    display: 'flex',
    flexGrow: 1,
    height: '100%',
    marginRight: `-${detailBarsOverlap}`,
    maxWidth: '100%',
    overflowX: 'scroll',
    paddingLeft: '0.5rem',
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
    <div className={clsx(classes.verticalScroller, scrollBoxCID, 'theme')}>
      {children}
    </div>
  );
};

export default VerticalScroller;
