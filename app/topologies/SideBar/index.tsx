import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTopologyProvider } from 'link-redux';

import { sideBarTopology } from '../../topologies';
import { TopologyFC } from '../Topology';

const useStyles = makeStyles({
  wrapper: {
    flex: 0,
  },
});

const SideBar: TopologyFC = ({ children }) => {
  const [SideBarTopology] = useTopologyProvider(sideBarTopology);
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
