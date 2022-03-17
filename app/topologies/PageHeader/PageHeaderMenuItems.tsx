import { makeStyles } from '@material-ui/styles';
import React from 'react';

import { LibroTheme } from '../../themes/themes';

const useStyles = makeStyles<LibroTheme>((theme) => ({
  pageHeaderMenuItems: {
    alignItems: 'flex-end',
    color: theme.palette.grey.main,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '2em',
  },
}));

const PageHeaderMenuItems: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.pageHeaderMenuItems}>
      {children}
    </div>
  );
};

export default PageHeaderMenuItems;
