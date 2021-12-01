import { makeStyles } from '@material-ui/styles';
import React from 'react';

import Column, { GUTTER_SIZE } from '../Column';

interface ColumnsProps {
  /** Each child becomes a column. */
  children: JSX.Element | JSX.Element[];
}

const useStyles = makeStyles({
  columns: {
    alignItems: 'flex-start',
    boxSizing: 'border-box',
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: `-${GUTTER_SIZE}`,
    marginRight: `-${GUTTER_SIZE}`,
  },
});

const Columns = ({
  children,
}: ColumnsProps): JSX.Element => {
  const classes = useStyles();

  const normChildren = Array.isArray(children) ? children : [children];
  const renderColumns = normChildren.map((child: JSX.Element) => (
    <Column
      key={`col-${child.key}`}
    >
      {child}
    </Column>
  ));

  return (
    <div className={classes.columns}>
      {renderColumns}
    </div>
  );
};

export default Columns;
