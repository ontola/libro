import { makeStyles } from '@mui/styles';
import React, { ChildrenProp } from 'react';

const useStyles = makeStyles({
  pageHeaderText: {
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 1,
    justifyContent: 'center',
    width: '100%',
  },
});

const PageHeaderText: React.FC<ChildrenProp> = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.pageHeaderText}>
      {children}
    </div>
  );
};

export default PageHeaderText;
