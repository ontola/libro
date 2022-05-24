import {
  WithStyles,
  createStyles,
  withStyles,
} from '@mui/styles';
import clsx from 'clsx';
import {
  TopologyProvider,
  Type,
} from 'link-redux';
import React from 'react';

import {
  BreakPoints,
  LibroTheme,
  Margin,
  Size,
} from '../../themes/themes';
import { pageHeaderTopology } from '../../topologies';
import Container from '../Container';

export { default as PageHeaderImage } from './PageHeaderImage';
export { default as PageHeaderImageAndTextWrapper } from './PageHeaderImageAndTextWrapper';
export { default as PageHeaderMenuItems } from './PageHeaderMenuItems';
export { default as PageHeaderText } from './PageHeaderText';

const defaultPercentage = 50;

const styles = (theme: LibroTheme) => createStyles({
  pageHeader: {
    '& .MuiContainer-root': {
      bottom: 0,
      height: '100%',
    },
    marginBottom: theme.spacing(Margin.Large),
    marginTop: `-${theme.spacing(Margin.Medium)}`,
  },

  pageHeaderBackground: {
    backgroundPositionX: 'center',
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
});

interface PageHeaderProps extends React.PropsWithChildren<WithStyles<typeof styles>> {
  // URL to the background image
  background?: string;
  // Number between 0 and 100
  positionY?: number;
}

/**
 * Page filler with title and nav items at the top of a page
 * Strechtes to big size when a background is present
 * @returns {component} Component
 */
class PageHeader extends TopologyProvider<PageHeaderProps> {
  constructor(props: PageHeaderProps) {
    super(props);

    this.className = this.getClassName();
    this.topology = pageHeaderTopology;
  }

  public getClassName(): string {
    return this.props.classes.pageHeader;
  }

  render() {
    const style: React.CSSProperties = {};
    const className = clsx({
      [this.props.classes.pageHeader]: true,
      [this.props.classes.pageHeaderBackground]: this.props.background,
      [this.props.classes.pageHeaderNoBackground]: !this.props.background,
    });

    if (this.props.background) {
      style.backgroundImage = `url(${this.props.background})`;
      style.backgroundPositionY = `${this.props.positionY || defaultPercentage}%`;
    }

    return (
      <React.Fragment>
        <div
          className={className}
          style={style}
        />
        <Container
          size={Size.Large}
        >
          {this.wrap((
            this.props.children || <Type />
          ))}
        </Container>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(PageHeader);
