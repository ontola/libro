import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import CategoryIcon from '@mui/icons-material/Category';
import WebIcon from '@mui/icons-material/Web';
import {
  TabContext,
  TabList,
  TabPanel,
} from '@mui/lab';
import { Grid, Tab } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

import {
  ComponentName,
  ProjectAction,
  ProjectContextProps,
} from '../context/ProjectContext';

import { ResourcePanel } from './Panels/ResourcePanel';
import { TOTAL_TOOLBAR_HEIGHT } from './Toolbar';

const useTabStyles = makeStyles({
  labelIcon: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column-reverse',
  },
  root: {
    minWidth: '1em',
    paddingLeft: '.4em',
    paddingRight: '.4em',
  },
});

const useStyles = makeStyles({
  closed: {
    display: 'none',
  },
  iconTransform: {
    marginLeft: 'auto',
    marginRight: 'auto',
    transform: 'rotate(270deg)',
    writingMode: 'vertical-rl',
  },
  label: {
    transform: 'rotate(180deg)',
    writingMode: 'vertical-rl',
  },
  leftPanel: {
    width: 'max-content',
  },
  panel: {
    height: `calc(100vh - ${TOTAL_TOOLBAR_HEIGHT}rem)`,
    overflow: 'auto',
  },
});

export const LeftPanel = ({ dispatch, project }: ProjectContextProps): JSX.Element => {
  const tabClasses = useTabStyles();
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
              classes={tabClasses}
              icon={<WebIcon className={classes.iconTransform} />}
              label={(
                <p className={classes.label}>
                  Manifest
                </p>
              )}
              value={ComponentName.Manifest}
            />
            <Tab
              classes={tabClasses}
              icon={<CategoryIcon className={classes.iconTransform} />}
              label={(
                <p className={classes.label}>
                  Resources
                </p>
              )}
              value={ComponentName.Website}
            />
            <Tab
              classes={tabClasses}
              icon={<AccountTreeIcon className={classes.iconTransform} />}
              label={(
                <p className={classes.label}>
                  Sitemap
                </p>
              )}
              value={ComponentName.Sitemap}
            />
            <Tab
              classes={tabClasses}
              icon={<DoubleArrowIcon className={classes.iconTransform} />}
              label={(
                <p className={classes.label}>
                  Distributions
                </p>
              )}
              value={ComponentName.Distributions}
            />
          </TabList>
        </Grid>
        <Grid
          item
          className={classes.panel}
        >
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
            className={classes.closed}
            value={ComponentName.Distributions}
          />
        </Grid>
      </Grid>
    </TabContext>
  );
};
