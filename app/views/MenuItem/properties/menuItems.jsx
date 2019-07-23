import {
  LinkedResourceContainer,
  linkType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { menuTopology } from '../../../topologies/Menu';
import { navbarTopology } from '../../../topologies/Navbar';

class MenuItems extends React.PureComponent {
  static type = [
    NS.ontola('MenuItem'),
    NS.argu('SubMenu'),
    NS.argu('MenuSection'),
  ];

  static property = NS.ontola('menuItems');

  static topology = [
    navbarTopology,
    menuTopology,
  ];

  static mapDataToProps = {
    menuItems: {
      label: NS.ontola('menuItems'),
      limit: Infinity,
    },
  };

  static propTypes = {
    childProps: PropTypes.objectOf(PropTypes.any),
    gutter: PropTypes.number,
    labelComp: PropTypes.node,
    menuItems: linkType,
    renderGutter: PropTypes.func,
  };

  render() {
    const rawProp = this.props.menuItems;
    if (rawProp.length === 0) {
      return this.props.labelComp;
    }
    const childProps = this.props.childProps || {};

    return rawProp
      .map(item => (
        <LinkedResourceContainer
          childProps={childProps}
          gutter={this.props.gutter}
          key={`menu-${item}`}
          renderGutter={this.props.renderGutter}
          subject={item}
        />
      ));
  }
}

export default register(MenuItems);
