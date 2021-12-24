import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React from 'react';

import { LibroTheme } from '../../themes/themes';

export interface PageRowProps {
  children: React.ComponentType;
  white?: boolean;
}

const useStyles = makeStyles<LibroTheme>((theme) => ({
  pageRow: {
    padding: '3em 0',
  },
  pageRowWhite: {
    backgroundColor: theme.palette.common.white,
    borderBottom: 'solid 1px rgb(230, 230, 230)',
    borderTop: 'solid 1px rgb(230, 230, 230)',
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
