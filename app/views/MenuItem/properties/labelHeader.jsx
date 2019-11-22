import { linkType, register } from 'link-redux';
import React from 'react';

import NavbarLinkLabel from '../../../components/NavbarLink/NavbarLinkLabel';
import { NS } from '../../../helpers/LinkedRenderStore';
import { navbarTopology } from '../../../topologies/Navbar';

class MenuItemLabelHeader extends React.PureComponent {
  static type = [
    NS.ontola('MenuItem'),
    NS.argu('SubMenu'),
    NS.argu('Menu'),
  ];

  static property = NS.schema('name');

  static topology = navbarTopology;

  static mapDataToProps = {
    image: NS.schema('image'),
    name: NS.schema('name'),
  };

  static propTypes = {
    linkedProp: linkType,
  };

  render() {
    const { linkedProp } = this.props;

    return (
      <NavbarLinkLabel>
        {linkedProp.value}
      </NavbarLinkLabel>
    );
  }
}

export default register(MenuItemLabelHeader);
