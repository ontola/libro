import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/styles';
import {
  Resource,
  linkType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { isPromise } from '../../../helpers/types';
import app from '../../../ontology/app';
import { allTopologies } from '../../../topologies';
import TabBar from '../../../topologies/TabBar';
import { MenuTypes } from '../types';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    color: theme.palette.grey.dark,
    opacity: 'unset',
  },
}));

const MenuTabs = ({
  currentTab,
  items,
  onChange,
}) => {
  const classes = useStyles();

  if (!__CLIENT__) {
    return null;
  }

  if (isPromise(items) || items.length === 0) {
    // TODO: Loading
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
            onClick={onChange}
          />
        ))}
      </TabBar>
    </AppBar>
  );
};

MenuTabs.type = MenuTypes;

MenuTabs.property = app.menuTabs;

MenuTabs.topology = allTopologies;

MenuTabs.propTypes = {
  currentTab: linkType,
  items: PropTypes.arrayOf(PropTypes.element),
  onChange: PropTypes.func,
};

export default register(MenuTabs);
