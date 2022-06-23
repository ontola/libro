import Tab from '@mui/material/Tab';
import { makeStyles } from '@mui/styles';
import * as schema from '@ontologies/schema';
import clsx from 'clsx';
import {
  FC,
  Property,
  register,
  useLRS,
  useProperty,
} from 'link-redux';
import React, { FormEventHandler } from 'react';

import ontola from '../../../../ontology/ontola';
import { LibroTheme } from '../../../../themes/themes';
import { tabBarTopology } from '../../../../topologies';
import { TabVariant } from '../../../Common/components/Tabs';
import { isDifferentWebsite } from '../../../Common/lib/iris';

import { MenuTypes } from './types';

interface MenuItemTabProps {
  onClick: FormEventHandler<HTMLAnchorElement>;
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
  subsection: {
    '& > *:first-child': {
      paddingRight: '6px',
    },
    minHeight: '48px',
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
  const openWindow = React.useCallback<FormEventHandler<HTMLAnchorElement>>((e) => {
    e.preventDefault();

    lrs.actions.ontola.openWindow(href!.value);
  }, [lrs, href]);
  const handleClick = href && isDifferentWebsite(href.value)
    ? openWindow
    : onClick;

  const tabClass = clsx({
    [classes.subsection]: variant === TabVariant.SubSection,
    [classes.selectedSubsection]: variant === TabVariant.SubSection && selected,
    [classes.unSelectedSubsection]: variant === TabVariant.SubSection && !selected,
  });

  return (
    <Tab
      classes={{
        root: tabClass,
      }}
      href={subject.value}
      icon={<Property label={schema.image} />}
      iconPosition="start"
      key={subject.value}
      label={<Property label={schema.name} />}
      tabIndex={selected ? 0 : -1}
      value={subject.value}
      onChange={handleClick}
    />
  );
};

MenuItemTab.type = MenuTypes;

MenuItemTab.topology = tabBarTopology;

export default register(MenuItemTab);
