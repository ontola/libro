import {
  Property,
  linkedPropType,
  register,
} from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { navbarTopology } from '../../../topologies/Navbar';

import './name.scss';

class OrganizationNameNavbar extends React.PureComponent {
  static type = [NS.schema('Organization'), NS.argu('Page'), NS.schema('WebSite')];

  static property = [
    NS.schema('name'),
    NS.rdfs('label'),
    NS.foaf('name'),
  ];

  static topology = navbarTopology;

  static propTypes = {
    linkedProp: linkedPropType,
  };

  render() {
    const { linkedProp } = this.props;

    return (
      <div className="OrganizationNameNavbar">
        <Property label={NS.schema('image')} />
        <span className="OrganizationNameNavbar__value NavbarLink__label">{linkedProp.value}</span>
      </div>
    );
  }
}

export default register(OrganizationNameNavbar);
