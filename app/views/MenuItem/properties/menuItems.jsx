import {
  LinkedResourceContainer,
  linkType,
  register,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { SideBarCollapsible } from '../../../components';
import { dropdownContentTopology } from '../../../topologies/DropdownContent';
import { sidebarTopology } from '../../../topologies/Sidebar';

class MenuItems extends React.PureComponent {
  static type = [
    NS.argu('MenuItem'),
    NS.argu('SubMenu'),
    NS.argu('MenuSection'),
  ];

  static property = NS.argu('menuItems');

  static topology = [
    sidebarTopology,
    dropdownContentTopology,
  ];

  static mapDataToProps = {
    menuItems: {
      label: NS.argu('menuItems'),
      limit: Infinity,
    },
  };

  static propTypes = {
    labelComp: PropTypes.node,
    menuItems: linkType,
    subject: subjectType,
  };

  render() {
    const rawProp = this.props.menuItems;
    if (rawProp.length === 0) {
      return this.props.labelComp;
    }

    const items = rawProp
      .map(item => (
        <LinkedResourceContainer
          key={`menu-${item}`}
          subject={item}
        />
      ));

    if (!this.props.labelComp) {
      return items;
    }

    if (items) {
      return (
        <SideBarCollapsible
          data-test="MenuItem-menuItems-collapsible"
          id={`${this.props.subject}-menu-items`}
          labelComp={this.props.labelComp}
        >
          {items}
        </SideBarCollapsible>
      );
    }

    return this.props.labelComp;
  }
}

export default register(MenuItems);
