import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import React from 'react';

import { LibroTheme } from '../../../Kernel/lib/themes';

export interface PageRowProps {
  children: React.ReactNode;
  white?: boolean;
}

const useStyles = makeStyles<LibroTheme>((theme) => ({
  pageRow: {
    padding: '3em 0',
  },
  pageRowWhite: {
    backgroundColor: theme.palette.common.white,
    borderBottom: theme.greyBorder,
    borderTop: theme.greyBorder,
  },
}));

const PageRow = ({ children, white }: PageRowProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div
      className={clsx({
        [classes.pageRow]: true,
        [classes.pageRowWhite]: white,
      })}
    >
      {children}
    </div>
  );
};

export default PageRow;
