import { withStyles } from '@material-ui/styles';

import argu from '../../ontology/argu';
import Topology from '../Topology';

export const sideBarTopology = argu.ns('sideBarTopology');

const styles = {
  wrapper: {
    flex: 0,
  },
};

class SideBar extends Topology {
  constructor(props) {
    super(props);

    this.className = props.classes.wrapper;
    this.elementType = 'div';
    this.topology = sideBarTopology;
  }
}

SideBar.propTypes = {
};

export default withStyles(styles)(SideBar);
