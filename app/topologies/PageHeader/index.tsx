import {
  WithStyles,
  createStyles,
  withStyles,
} from '@material-ui/styles';
import clsx from 'clsx';
import deepmerge from 'deepmerge';
import {
  TopologyProvider,
  Type,
} from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import {
  LibroTheme,
  Margin,
  Size,
} from '../../themes/themes';
import { cardClassIdentifier } from '../Card/sharedCardStyles';
import Container from '../Container';

export { default as PageHeaderImage } from './PageHeaderImage';
export { default as PageHeaderImageAndTextWrapper } from './PageHeaderImageAndTextWrapper';
export { default as PageHeaderMenuItems } from './PageHeaderMenuItems';
export { default as PageHeaderText } from './PageHeaderText';

export const pageHeaderTopology = argu.ns('pageHeader');

const defaultPercentage = 50;

const pageHeaderInnerCID = 'CID-PageHeaderInner';

type PageHeaderProps = WithStyles<typeof styles> & {
  // URL to the background image
  background?: string;
  // Number between 0 and 100
  positionY?: number;
};

const styles = (theme: LibroTheme) => createStyles(deepmerge({
  pageHeader: {
    '& .MuiContainer-root': {
      bottom: 0,
      height: '100%',
    },
    [theme.breakpoints.up('lg')]: {
      height: '15em',
    },
    [`& .${cardClassIdentifier}`]: {
      bottom: 0,
      maxWidth: '35em',
      position: 'absolute',
      width: 'calc(100% - 1.5rem)',
    },
    background: 'var(--navbar-background)',
    height: '10em',
    marginBottom: theme.spacing(Margin.Large),
    marginTop: `-${theme.spacing(Margin.Medium)}`,
    position: 'relative',
  },

  pageHeaderBackground: {
    [`& .${pageHeaderInnerCID}`]: {
      backgroundPositionX: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
    height: '20em',
    [theme.breakpoints.up('lg')]: {
      height: '35em',
    },
  },

  pageHeaderInner: {
    backgroundColor: theme.palette.transparent.light7,
    height: '100%',
  },
}, theme.overrides?.PageHeader || {}));

/**
 * Page filler with title and nav items at the top of a page
 * Strechtes to big size when a background is present
 * @returns {component} Component
 */
class PageHeader extends TopologyProvider<PageHeaderProps> {
  constructor(props: PageHeaderProps) {
    super(props);

    this.className = this.props.classes.pageHeader;
    this.topology = pageHeaderTopology;
  }

  render() {
    const style: React.CSSProperties = {};
    const className = clsx({
      [this.props.classes.pageHeader]: true,
      [this.props.classes.pageHeaderBackground]: this.props.background,
    });

    if (this.props.background) {
      style.backgroundImage = `url(${this.props.background})`;

      style.backgroundPositionY = `${this.props.positionY || defaultPercentage}%`;
    }

    return (
      <div className={className}>
        <div
          className={clsx(
            pageHeaderInnerCID,
            this.props.classes.pageHeaderInner,
          )}
          style={style}
        >
          <Container size={Size.Large}>
            {this.wrap((
              this.props.children || <Type />
            ))}
          </Container>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PageHeader);
