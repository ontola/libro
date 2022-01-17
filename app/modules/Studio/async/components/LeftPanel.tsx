import { Grid } from '@material-ui/core';
import Tab from '@material-ui/core/Tab';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import SettingsIcon from '@material-ui/icons/Settings';
import WebIcon from '@material-ui/icons/Web';
import {
  TabContext,
  TabList,
  TabPanel,
} from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

import {
  ComponentName,
  ProjectAction,
  ProjectContextProps,
} from '../context/ProjectContext';

import { DistributionsPanel } from './Panels/DistributionsPanel';
import { ResourcePanel } from './Panels/ResourcePanel';

const useStyles = makeStyles({
  closed: {
    display: 'none',
  },
  iconTransform: {
    marginLeft: 'auto',
    marginRight: 'auto',
    transform: 'rotate(90deg)',
    writingMode: 'vertical-rl',
  },
  leftPanel: {
    width: 'max-content',
  },
  root: {
    minWidth: '1em',
    paddingLeft: '.1em',
    paddingRight: '.1em',
  },
  wrapper: {
    transform: 'rotate(180deg)',
    writingMode: 'vertical-rl',
  },
});

export const LeftPanel = ({ dispatch, project }: ProjectContextProps): JSX.Element => {
  const classes = useStyles();
  const [tab, setTab] = React.useState<ComponentName | 'closed'>(ComponentName.Manifest);

  React.useEffect(() => {
    if (tab === 'closed') {
      dispatch({
        type: ProjectAction.Close,
      });
    } else {
      dispatch({
        id: tab,
        type: ProjectAction.SetFile,
      });
    }
  }, [tab]);

  return (
    <TabContext value={tab!}>
      <Grid
        container
        className={classes.leftPanel}
      >
        <Grid item>
          <TabList
            orientation="vertical"
            value={tab}
            onChange={(_, value) => {
              setTab(value === tab ? 'closed' : value);
            }}
          >
            <Tab
              classes={classes}
              icon={<WebIcon className={classes.iconTransform} />}
              label="Manifest"
              value={ComponentName.Manifest}
            />
            <Tab
              classes={classes}
              icon={<SettingsIcon className={classes.iconTransform} />}
              label="Resources"
              value={ComponentName.Website}
            />
            <Tab
              classes={classes}
              icon={<AccountTreeIcon className={classes.iconTransform} />}
              label="Sitemap"
              value={ComponentName.Sitemap}
            />
            <Tab
              classes={classes}
              icon={<DoubleArrowIcon className={classes.iconTransform} />}
              label="Distributions"
              value={ComponentName.Distributions}
            />
          </TabList>
        </Grid>
        <Grid item>
          <TabPanel
            className={classes.closed}
            value="closed"
          />
          <TabPanel
            className={classes.closed}
            value={ComponentName.Manifest}
          />
          <TabPanel
            value={ComponentName.Website}
          >
            <ResourcePanel
              dispatch={dispatch}
              project={project}
            />
          </TabPanel>
          <TabPanel
            className={classes.closed}
            value={ComponentName.Sitemap}
          />
          <TabPanel
            value={ComponentName.Distributions}
          >
            <DistributionsPanel
              dispatch={dispatch}
              project={project}
            />
          </TabPanel>
        </Grid>
      </Grid>
    </TabContext>
  );
};
