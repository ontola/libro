import MUIContainer from '@material-ui/core/Container';
import { WithStyles } from '@material-ui/core/styles';
import { createStyles, withStyles } from '@material-ui/styles';
import { Classes } from '@material-ui/styles/mergeClasses/mergeClasses';
import React from 'react';

import { LibroTheme } from '../../themes/themes';
import { parentTopology } from '../../topologies';
import Topology from '../Topology';

export interface BreadcrumbsBarProps {
  showArrow?: boolean;
  classes?: Classes;
}

const styles = createStyles((theme: LibroTheme) => ({
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
}));

type PropTypes = BreadcrumbsBarProps & WithStyles<typeof styles>;

/**
 * Used to divide a card in multiple rows
 * @returns {component} Component
 */
class BreadcrumbsBar extends Topology<PropTypes> {
  public constructor(props: PropTypes) {
    super(props);

    this.topology = parentTopology;
  }

  public render() {
    return this.wrap((
      <div className={this.props.classes.breadcrumbsBar}>
        <MUIContainer
          maxWidth="lg"
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
