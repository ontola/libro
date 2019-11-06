import rdf from '@ontologies/core';
import {
  LinkedResourceContainer,
  Property,
  register,
  subjectType,
  useLRS,
} from 'link-redux';
import React from 'react';

import { LDLink } from '../../components';
import NavbarLinkIcon from '../../components/NavbarLink/NavbarLinkIcon';
import { NS } from '../../helpers/LinkedRenderStore';
import { navbarTopology } from '../../topologies/Navbar';

import './properties/name';

const PersonNavbar = ({ subject }) => {
  const lrs = useLRS();
  const menuIri = lrs.getResourceProperty(subject, NS.ontola('profileMenu'));

  return (
    <div className="NavbarLink">
      <LinkedResourceContainer showImage subject={NS.app('n')} topology={navbarTopology}>
        <LDLink to={rdf.namedNode(`${menuIri.value}#notifications`)}>
          <Property label={NS.argu('unreadCount')} />
        </LDLink>
      </LinkedResourceContainer>
      <LDLink className="NavbarLink__link">
        <NavbarLinkIcon features="padded">
          <Property label={NS.schema('image')}>
            <Property label={[NS.schema('thumbnail'), NS.ontola('imgUrl64x64')]} />
          </Property>
        </NavbarLinkIcon>
      </LDLink>
      <Property label={NS.schema('email')} />
    </div>
  );
};

PersonNavbar.type = NS.schema('Person');

PersonNavbar.topology = navbarTopology;

PersonNavbar.propTypes = {
  subject: subjectType,
};

export default register(PersonNavbar);
