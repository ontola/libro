import { WithStyles, withStyles } from '@mui/styles';
import React from 'react';

import { sideBarTopology } from '../../topologies';
import Topology from '../Topology';

const styles = {
  wrapper: {
    flex: 0,
  },
};

type SideBarProps = WithStyles<typeof styles>;

class SideBar extends Topology<SideBarProps> {
  constructor(props: SideBarProps) {
    super(props);

    this.className = this.getClassName();
    this.elementType = 'div';
    this.topology = sideBarTopology;
  }

  public getClassName(): string {
    return this.props.classes.wrapper;
  }

  render() {
    return (
      <nav
        className={this.getClassName()}
        role="navigation"
      >
        {this.wrap(this.props.children)}
      </nav>
    );
  }
}

export default withStyles(styles)(SideBar);
