import { Property, register } from 'link-redux';
import React from 'react';

import { LDLink } from '../../components';
import HeaderLinkLabel from '../../components/HeaderLink/HeaderLinkLabel';
import SidebarLinkIcon from '../../components/HeaderLink/HeaderLinkIcon';
import { NS } from '../../helpers/LinkedRenderStore';
import { headerTopology } from '../../topologies/Header';

import './properties/name';

class CurrentActorSidebar extends React.PureComponent {
  static type = NS.schema('Person');

  static topology = headerTopology;

  render() {
    return (
      <div className="HeaderLink">
        <LDLink className="HeaderLink__link">
          <SidebarLinkIcon>
            <Property label={NS.schema('image')} />
          </SidebarLinkIcon>
          <HeaderLinkLabel>
            <Property label={NS.schema('name')} />
          </HeaderLinkLabel>
        </LDLink>
        <Property label={NS.schema('email')} />
      </div>
    );
  }
}

export default register(CurrentActorSidebar);
