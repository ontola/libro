import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  margin: {
    height: '.8rem',
  },
});

/** Margin - Sets a horizontal margin, similar to a break.
 * Should only be used in the Top of a Card / CardRow component. */
const Margin = () => {
  const classes = useStyles();

  return (<div className={classes.margin} />);
};

export default Margin;
