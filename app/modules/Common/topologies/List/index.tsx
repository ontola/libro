import { createStyles, makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { TopologyFC, createTopologyProvider } from 'link-redux';
import React from 'react';

import { listTopology } from '../index';

export enum ListDirection {
  Column = 'column',
}

interface ListProps {
  direction?: ListDirection;
  overflow?: boolean;
  wrap?: boolean;
}

const useStyles = makeStyles(() => createStyles({
  column: {
    flexDirection: 'column',
  },
  list: {
    display: 'flex',
  },
  overflow: {
    overflowX: 'hidden',
    overflowY: 'scroll',
  },
  wrap: {
    flexWrap: 'wrap',
  },
}));

const ListTopology = createTopologyProvider(listTopology);

/**
 * Sets the List topology
 */
const List: TopologyFC<ListProps> = ({
  children, direction, overflow, wrap,
}) => {
  const classes = useStyles();

  const className = clsx({
    [classes.list]: true,
    [classes.column]: direction === ListDirection.Column,
    [classes.overflow]: overflow,
    [classes.wrap]: wrap,
  });

  return (
    <ListTopology>
      <div className={className}>
        {children}
      </div>
    </ListTopology>
  );
};

export default List;
