import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
  },
}));

const PageWithSideBar = ({
  children,
}: {
  children: any,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      {children}
    </div>
  );
};

export default PageWithSideBar;
