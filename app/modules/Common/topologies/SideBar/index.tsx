import { makeStyles } from '@mui/styles';
import { useTopologyProvider } from 'link-redux';
import React from 'react';

import { TopologyFC } from '../../../Kernel/lib/topology';
import { sideBarTopology } from '../index';

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
