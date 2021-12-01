import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

export interface ColumnProps {
  /** Each child becomes a column. */
  children: JSX.Element,
}

export const GUTTER_SIZE = '0.5rem';

const useStyles = makeStyles({
  column: {
    boxSizing: 'border-box',
    flexBasis: '19em',
    flexGrow: 1,
    marginLeft: GUTTER_SIZE,
    marginRight: GUTTER_SIZE,
    maxWidth: '100%',
  },
});

const Column = ({
  children,
}: ColumnProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div
      className={classes.column}
      data-testid="column"
    >
      {children}
    </div>
  );
};

export default Column;
