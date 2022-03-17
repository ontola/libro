import { makeStyles } from '@material-ui/styles';
import React from 'react';

import SideBar from '../../topologies/SideBar';

const useStyles = makeStyles(() => ({
  children: {
    flex: 1,
  },
  wrapper: {
    display: 'flex',
  },
}));

export interface PageWithSideBarProps {
  children: React.ReactNode,
  sidebar: React.ReactNode,
}

const PageWithSideBar = ({
  children,
  sidebar,
}: PageWithSideBarProps): JSX.Element => {
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
