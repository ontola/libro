import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import clsx from 'clsx';
import {
  FC,
  Property,
  register,
  useLRS,
  useProperty,
} from 'link-redux';
import React from 'react';

import { TabVariant } from '../../components/Tabs';
import { isDifferentWebsite } from '../../helpers/iris';
import ontola from '../../ontology/ontola';
import { LibroTheme } from '../../themes/themes';
import { tabBarTopology } from '../../topologies/TabBar';

import { MenuTypes } from './types';

interface MenuItemTabProps {
  onClick: React.EventHandler<any>;
  variant?: TabVariant;
  selected?: boolean;
}

const useStyles = makeStyles<LibroTheme>((theme) => ({
  selectedSubsection: {
    backgroundColor: theme.palette.background.default,
    border: '1px solid #E0E0E0',
    borderBottom: 'none',
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
    opacity: 1,
  },
  unSelectedSubsection: {
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const MenuItemTab: FC<MenuItemTabProps> = ({
  subject,
  onClick,
  variant,
  selected,
}) => {
  const [href] = useProperty(ontola.href);

  const lrs = useLRS();
  const classes = useStyles();
  const openWindow = React.useCallback((e) => {
    e.preventDefault();

    lrs.actions.ontola.openWindow(href!.value);
  }, [lrs, href]);
  const handleClick = href && isDifferentWebsite(href.value)
    ? openWindow
    : onClick;

  const tabClass = clsx({
    [classes.selectedSubsection]: variant === TabVariant.SubSection && selected,
    [classes.unSelectedSubsection]: variant === TabVariant.SubSection && !selected,
  });

  return (
    <Tab
      classes={{
        root: tabClass,
      }}
      icon={<Property label={schema.image} />}
      key={subject.value}
      label={<Property label={schema.name} />}
      value={subject.value}
      onChange={handleClick}
    />
  );
};

MenuItemTab.type = MenuTypes;

MenuItemTab.topology = tabBarTopology;

export default register(MenuItemTab);
