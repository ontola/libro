import MaterialMenu from '@material-ui/core/Menu';
import PropTypes from 'prop-types';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import Topology from '../Topology';

export const menuTopology = NS.argu('material/menu');

class Menu extends Topology {
  static propTypes = {
    anchorEl: __CLIENT__ ? PropTypes.instanceOf(Element) : PropTypes.oneOf([undefined]),
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    onClose: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.topology = menuTopology;
  }

  render() {
    const {
      anchorEl,
      children,
      onClose,
    } = this.props;

    return this.wrap(
      <MaterialMenu
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'bottom',
        }}
        getContentAnchorEl={null}
        open={Boolean(anchorEl)}
        onClose={onClose}
      >
        {children}
      </MaterialMenu>
    );
  }
}

export default Menu;
