import { LinkedResourceContainer, Property, register } from 'link-redux';
import React from 'react';

import { LDLink } from '../../components';
import NavbarLinkIcon from '../../components/NavbarLink/NavbarLinkIcon';
import { NS } from '../../helpers/LinkedRenderStore';
import { navbarTopology } from '../../topologies/Navbar';

import './properties/name';

class PersonNavbar extends React.PureComponent {
  static type = NS.schema('Person');

  static topology = navbarTopology;

  render() {
    return (
      <div className="NavbarLink">
        <LinkedResourceContainer showImage subject={NS.app('n')} topology={navbarTopology}>
          <LDLink>
            <Property label={NS.argu('unreadCount')} />
          </LDLink>
        </LinkedResourceContainer>
        <LDLink className="NavbarLink__link">
          <NavbarLinkIcon features="padded">
            <Property label={NS.schema('image')} />
          </NavbarLinkIcon>
        </LDLink>
        <Property label={NS.schema('email')} />
      </div>
    );
  }
}

export default register(PersonNavbar);
