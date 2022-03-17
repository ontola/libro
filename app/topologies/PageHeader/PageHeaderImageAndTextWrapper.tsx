import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles({
  pageHeaderImageAndTextWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
});

const PageHeaderMenuItems: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.pageHeaderImageAndTextWrapper}>
      {children}
    </div>
  );
};

export default PageHeaderMenuItems;
