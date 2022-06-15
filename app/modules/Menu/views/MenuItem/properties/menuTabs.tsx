import { makeStyles } from '@mui/styles';
import * as schema from '@ontologies/schema';
import clsx from 'clsx';
import {
  FC,
  PropertyProps,
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import app from '../../../../../ontology/app';
import { LibroTheme } from '../../../../../themes/themes';
import { allTopologies } from '../../../../../topologies';
import TabBar from '../../../../../topologies/TabBar';
import { useTabbar } from '../../../../Common/components/TabbarProvider';
import { TabVariant } from '../../../../Common/components/Tabs';

export interface MenuTabsProp {
  variant?: TabVariant;
}

const useStyles = makeStyles((theme: LibroTheme) => ({
  wrapper: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.grey.xDark,
    opacity: 'unset',
  },
  wrapperNoTabs: {
    height: '2rem',
  },
  wrapperSubSection: {
    marginBottom: '2rem',
  },
}));

const MenuTabs: FC<MenuTabsProp & PropertyProps> = ({ variant }) => {
  const {
    currentTab,
    items,
    handleChange,
  } = useTabbar();
  const classes = useStyles();

  if (!__CLIENT__) {
    return null;
  }

  if (items.length <= 1 || !currentTab) {
    return <div className={classes.wrapperNoTabs} />;
  }

  const className = clsx({
    [classes.wrapper]: true,
    [classes.wrapperSubSection]: variant === TabVariant.SubSection,
  });

  return (
    <div className={className}>
      <TabBar
        value={currentTab?.value}
        variant={variant}
      >
        {items.map((iri) => (
          <Resource
            key={iri.value}
            subject={iri}
            value={iri.value}
            variant={variant}
            onClick={handleChange}
          />
        ))}
      </TabBar>
    </div>
  );
};

MenuTabs.type = schema.Thing;

MenuTabs.property = app.menuTabs;

MenuTabs.topology = allTopologies;

export default register(MenuTabs);
