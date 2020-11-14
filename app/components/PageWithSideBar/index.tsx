import { makeStyles } from '@material-ui/styles';
import React from 'react';

import SideBar from '../../topologies/SideBar';
import { ReactNodeLike } from 'prop-types';

const useStyles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
  },
  children: {
    flex: 1,
  },
}));

const PageWithSideBar = ({
  children,
  sidebar,
}: {
  children: ReactNodeLike,
  sidebar: ReactNodeLike,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.children}>
        {children}
      </div>
      <SideBar>
        {sidebar}
      </SideBar>
    </div>
  );
};

export default PageWithSideBar;
