import * as schema from '@ontologies/schema';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/styles';
import {
  FC,
  PropertyProps,
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import { useTabbar } from '../../../components/TabbarProvider';
import { isPromise } from '../../../helpers/types';
import app from '../../../ontology/app';
import { LibroTheme } from '../../../themes/themes';
import { allTopologies } from '../../../topologies';
import TabBar from '../../../topologies/TabBar';

const useStyles = makeStyles((theme: LibroTheme) => ({
  wrapper: {
    color: theme.palette.grey.dark,
    opacity: 'unset',
  },
}));

const MenuTabs: FC<PropertyProps> = () => {
  const {
    currentTab,
    items,
    handleChange,
  } = useTabbar();
  const classes = useStyles();

  if (!__CLIENT__) {
    return null;
  }

  if (isPromise(items) || !items || items.length <= 1 || !currentTab) {
    return null;
  }

  return (
    <AppBar
      className={classes.wrapper}
      color="inherit"
      elevation={0}
      position="static"
    >
      <TabBar value={currentTab?.value}>
        {items.map((iri) => (
          <Resource
            key={iri.value}
            subject={iri}
            value={iri.value}
            onClick={handleChange}
          />
        ))}
      </TabBar>
    </AppBar>
  );
};

MenuTabs.type = schema.Thing;

MenuTabs.property = app.menuTabs;

MenuTabs.topology = allTopologies;

export default register(MenuTabs);
