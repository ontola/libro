import { makeStyles } from '@mui/styles';
import React, { ChildrenProp } from 'react';

import { LibroTheme } from '../../../Kernel/lib/themes';

const useStyles = makeStyles<LibroTheme>((theme) => ({
  pageHeaderMenuItems: {
    alignItems: 'flex-end',
    color: theme.palette.grey.main,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '2em',
  },
}));

const PageHeaderMenuItems: React.FC<ChildrenProp> = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.pageHeaderMenuItems}>
      {children}
    </div>
  );
};

export default PageHeaderMenuItems;
