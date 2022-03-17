import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles({
  pageHeaderText: {
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 1,
    justifyContent: 'center',
    width: '100%',
  },
});

const PageHeaderText: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.pageHeaderText}>
      {children}
    </div>
  );
};

export default PageHeaderText;
