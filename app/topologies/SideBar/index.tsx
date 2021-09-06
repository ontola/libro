import { ClassNameMap, withStyles } from '@material-ui/styles';
import React from 'react';

import argu from '../../ontology/argu';
import Topology from '../Topology';

export const sideBarTopology = argu.ns('sideBarTopology');

const styles = {
  wrapper: {
    flex: 0,
  },
};

export interface SideBarProps {
  classes?: ClassNameMap;
}

class SideBar extends Topology<SideBarProps> {
  constructor(props: SideBarProps) {
    super(props);

    this.className = props.classes?.wrapper;
    this.elementType = 'div';
    this.topology = sideBarTopology;
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
