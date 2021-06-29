import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
}));

const FormFooterRight: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      {children}
    </div>
  );
};

export default FormFooterRight;
