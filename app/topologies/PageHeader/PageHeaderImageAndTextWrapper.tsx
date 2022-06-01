import { makeStyles } from '@mui/styles';
import React, { ChildrenProp } from 'react';

const useStyles = makeStyles({
  pageHeaderImageAndTextWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
});

const PageHeaderMenuItems: React.FC<ChildrenProp> = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.pageHeaderImageAndTextWrapper}>
      {children}
    </div>
  );
};

export default PageHeaderMenuItems;
