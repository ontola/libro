import { makeStyles } from '@material-ui/core/styles';
import MUITabs from '@material-ui/core/Tabs';
import { History, Location } from 'history';
import React from 'react';

import { currentLocationControl } from '../../helpers/paths';
import { LibroTheme } from '../../themes/themes';

export enum TabVariant {
  Default,
  SubSection,
}

export interface TabsProps {
  variant?: TabVariant;
  value: unknown;
  resource: string | undefined;
  location: Location<History.PoorMansUnknown>;
}

const useSubSectionStyles = makeStyles<LibroTheme>((theme) => ({
  flexContainer: {
    '&::after': {
      content: '""',
      flexGrow: 1,
    },
  },
  indicator: {
    display: 'none',
  },
  root: {
    '&::after': {
      content: '""',
      flexGrow: 1,
    },
    '&::before': {
      content: '""',
      flexGrow: 1,
    },
    boxShadow: 'inset 0px -1px 0px 0px #E0E0E0',
    width: '100%',
  },
  scroller: {
    flexGrow: 0,
    maxWidth: theme.breakpoints.values.lg,
    width: '100%',
  },
}));

export const Tabs = ({
  children,
  location,
  resource,
  variant,
  value,
}: React.PropsWithChildren<TabsProps>): JSX.Element => {
  const subSectionClasses = useSubSectionStyles();

  return (
    <MUITabs
      classes={variant === TabVariant.SubSection ? {
        flexContainer: subSectionClasses.flexContainer,
        indicator: subSectionClasses.indicator,
        root: subSectionClasses.root,
        scroller: subSectionClasses.scroller,
      } : {}}
      resource={resource}
      scrollButtons="on"
      value={value || currentLocationControl(location).value}
      variant="scrollable"
    >
      {children}
    </MUITabs>
  );
};