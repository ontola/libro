import { makeStyles } from '@material-ui/core';
import React from 'react';

const useDividerStyles = makeStyles((theme) => ({
  divider: {
    borderLeft: '1px solid #dadce0',
    margin: theme.spacing(3, 1),
    userSelect: 'none',
  },
}));

export const Divider = () => {
  const { divider } = useDividerStyles();

  return <div className={divider} />;
};
