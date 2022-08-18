import { makeStyles } from '@mui/styles';
import { TopologyFC, createTopologyProvider } from 'link-redux';
import React from 'react';

import { sideBarTopology } from '../index';

const useStyles = makeStyles({
  wrapper: {
    flex: 0,
  },
});

const SideBarTopology = createTopologyProvider(sideBarTopology);

const SideBar: TopologyFC = ({ children }) => {
  const classes = useStyles();

  return (
    <nav
      className={classes.wrapper}
      role="navigation"
    >
      <SideBarTopology>
        {children}
      </SideBarTopology>
    </nav>
  );
};

export default SideBar;
