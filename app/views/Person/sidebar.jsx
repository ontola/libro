import { Property, register } from 'link-redux';
import React from 'react';

import { LDLink } from '../../components';
import SideBarLinkLabel from '../../components/SideBarLink/SideBarLinkLabel';
import SidebarLinkIcon from '../../components/SideBarLink/SideBarLinkIcon';
import { NS } from '../../helpers/LinkedRenderStore';
import { sidebarTopology } from '../../topologies/Sidebar';

import './properties/name';

class CurrentActorSidebar extends React.PureComponent {
  static type = NS.schema('Person');

  static topology = sidebarTopology;

  render() {
    return (
      <div className="SideBarLink">
        <LDLink className="SideBarLink__link">
          <SidebarLinkIcon>
            <Property label={NS.schema('image')} />
          </SidebarLinkIcon>
          <SideBarLinkLabel>
            <Property label={NS.schema('name')} />
          </SideBarLinkLabel>
        </LDLink>
        <Property label={NS.schema('email')} />
      </div>
    );
  }
}

export default register(CurrentActorSidebar);
