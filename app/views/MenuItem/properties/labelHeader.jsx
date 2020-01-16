import schema from '@ontologies/schema';
import { linkType, register } from 'link-redux';
import React from 'react';

import NavbarLinkLabel from '../../../components/NavbarLink/NavbarLinkLabel';
import argu from '../../../ontology/argu';
import ontola from '../../../ontology/ontola';
import { navbarTopology } from '../../../topologies/Navbar';

class MenuItemLabelHeader extends React.PureComponent {
  static type = [
    ontola.MenuItem,
    argu.SubMenu,
    argu.Menu,
  ];

  static property = schema.name;

  static topology = navbarTopology;

  static mapDataToProps = {
    image: schema.image,
    name: schema.name,
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
