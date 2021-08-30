import MUIContainer from '@material-ui/core/Container';
import { createStyles, withStyles } from '@material-ui/styles';
import { Classes } from '@material-ui/styles/mergeClasses/mergeClasses';
import React from 'react';

import { LibroTheme } from '../../themes/themes';
import { parentTopology } from '../../topologies/Parent';
import Topology from '../../topologies/Topology';

interface PropTypes {
  showArrow?: boolean;
  classes?: Classes;
}

const styles = createStyles((theme: LibroTheme) => ({
  breadcrumbsBar: {
    backgroundColor: theme.palette.grey.xxLight,
    borderBottom: `1px solid ${theme.palette.divider}`,
    marginBottom: '1rem',
    position: 'relative',
    top: '-1rem',
    width: '100%',
  },
  flex: {
    alignItems: 'center',
    color: theme.palette.primary.main,
    display: 'flex',
    gap: '.3rem',
  },
}));

/**
 * Used to divide a card in multiple rows
 * @returns {component} Component
 */
class BreadcrumbsBar extends Topology<PropTypes> {
  public constructor(props: PropTypes) {
    super(props);

    this.topology = parentTopology;
    this.className = props.classes!.breadcrumbsBar;
  }

  public render() {
    return this.wrap((
      <div className={this.getClassName()}>
        <MUIContainer
          maxWidth="lg"
        >
          <div className={this.props.classes!.flex}>
            {this.props.children}
          </div>
        </MUIContainer>
      </div>
    ));
  }
}

export default withStyles(styles)(BreadcrumbsBar);
