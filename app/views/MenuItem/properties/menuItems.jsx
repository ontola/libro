import {
  LinkedResourceContainer,
  Property,
  linkType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { dropdownContentTopology } from '../../../topologies/DropdownContent';
import { navbarTopology } from '../../../topologies/Navbar';
import { Dropdown } from '../../../components';

class MenuItems extends React.PureComponent {
  static type = [
    NS.ontola('MenuItem'),
    NS.argu('SubMenu'),
    NS.argu('MenuSection'),
  ];

  static property = NS.ontola('menuItems');

  static topology = [
    navbarTopology,
    dropdownContentTopology,
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

    if (!this.props.labelComp) {
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

    return (
      <Dropdown
        lazy
        trigger={<Property label={this.props.labelComp} />}
      >
        {() => (
          <LinkedResourceContainer
            childProps={childProps}
            gutter={this.props.gutter}
            subject={rawProp}
            topology={dropdownContentTopology}
          />
        )}
      </Dropdown>
    );
  }
}

export default register(MenuItems);
