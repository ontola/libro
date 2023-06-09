import { createStyles, makeStyles } from '@mui/styles';
import clsx from 'clsx';
import {
  TopologyFC,
  Type,
  createTopologyProvider, 
} from 'link-redux';
import React from 'react';

import {
  BreakPoints,
  LibroTheme,
  Margin,
  Size, 
} from '../../../Kernel/lib/themes';
import Container from '../Container';
import { pageHeaderTopology } from '../index';

export { default as PageHeaderImage } from './PageHeaderImage';
export { default as PageHeaderImageAndTextWrapper } from './PageHeaderImageAndTextWrapper';
export { default as PageHeaderMenuItems } from './PageHeaderMenuItems';
export { default as PageHeaderText } from './PageHeaderText';

const defaultPercentage = 50;

interface PageHeaderProps {
  // URL to the background image
  background?: string;
  // Number between 0 and 100
  positionY?: number;
}

const useStyles = makeStyles<LibroTheme, PageHeaderProps>((theme) => createStyles({
  pageHeader: {
    '& .MuiContainer-root': {
      bottom: 0,
      height: '100%',
    },
    marginBottom: theme.spacing(Margin.Large),
    marginTop: `-${theme.spacing(Margin.Medium)}`,
  },

  pageHeaderBackground: {
    backgroundImage: ({ background }) => `url(${background})`,
    backgroundPositionX: 'center',
    backgroundPositionY: ({ positionY }) => `${positionY ?? defaultPercentage}%`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '20em',
    [theme.breakpoints.up(BreakPoints.Large)]: {
      height: '35em',
    },
  },

  pageHeaderNoBackground: {
    backgroundColor: 'var(--navbar-background)',
    height: '10em',
    opacity: 0.3,
    [theme.breakpoints.up(BreakPoints.Large)]: {
      height: '15em',
    },
  },
}));

const PageHeaderTopology = createTopologyProvider(pageHeaderTopology);

/**
 * Page filler with title and nav items at the top of a page
 * Stretches to big size when a background is present
 */
const PageHeader: TopologyFC<PageHeaderProps> = ({ children, ...props }) => {
  const classes = useStyles(props);

  const className = clsx({
    [classes.pageHeader]: true,
    [classes.pageHeaderBackground]: props.background,
    [classes.pageHeaderNoBackground]: !props.background,
  });

  return (
    <React.Fragment>
      <div
        className={className}
      />
      <Container
        size={Size.Large}
      >
        <PageHeaderTopology>
          {children ?? <Type />}
        </PageHeaderTopology>
      </Container>
    </React.Fragment>

  );
};

export default PageHeader;
