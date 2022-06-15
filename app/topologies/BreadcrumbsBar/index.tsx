import MUIContainer from '@mui/material/Container';
import {
  WithStyles,
  createStyles,
  withStyles, 
} from '@mui/styles';
import React from 'react';

import { LibroTheme } from '../../themes/themes';
import { parentTopology } from '../../topologies';
import Topology from '../Topology';

const styles = (theme: LibroTheme) => createStyles({
  breadcrumbsBar: {
    backgroundColor: theme.palette.grey.xxLight,
    borderBottom: `1px solid ${theme.palette.divider}`,
    position: 'relative',
    width: '100%',
    ...(theme.appBar.background === 'white' ? {
      borderTop: `1px solid ${theme.palette.divider}`,
    } : {}),
  },
  flex: {
    alignItems: 'center',
    color: theme.palette.primary.main,
    display: 'flex',
    gap: '.3rem',
  },
});

interface BreadcrumbsBarProps extends React.PropsWithChildren<WithStyles<typeof styles>>{
  showArrow?: boolean;
}

/**
 * Used to divide a card in multiple rows
 * @returns {component} Component
 */
class BreadcrumbsBar extends Topology<BreadcrumbsBarProps> {
  public constructor(props: BreadcrumbsBarProps) {
    super(props);

    this.topology = parentTopology;
  }

  public render() {
    return this.wrap((
      <div className={this.props.classes.breadcrumbsBar}>
        <MUIContainer
          maxWidth="xl"
        >
          <div className={this.props.classes.flex}>
            {this.props.children}
          </div>
        </MUIContainer>
      </div>
    ));
  }
}

export default withStyles(styles)(BreadcrumbsBar);
