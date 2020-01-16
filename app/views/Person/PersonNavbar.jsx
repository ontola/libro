import rdf from '@ontologies/core';
import schema from '@ontologies/schema';
import {
  Property,
  Resource,
  register,
  subjectType,
  useLRS,
} from 'link-redux';
import React from 'react';

import { LDLink } from '../../components';
import NavbarLinkIcon from '../../components/NavbarLink/NavbarLinkIcon';
import app from '../../ontology/app';
import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import { navbarTopology } from '../../topologies/Navbar';

import './properties/name';

const PersonNavbar = ({ subject }) => {
  const lrs = useLRS();
  const menuIri = lrs.getResourceProperty(subject, ontola.profileMenu);

  return (
    <div className="NavbarLink">
      <Resource showImage subject={app.n} topology={navbarTopology}>
        <LDLink to={rdf.namedNode(`${menuIri.value}#notifications`)}>
          <Property label={argu.unreadCount} />
        </LDLink>
      </Resource>
      <LDLink className="NavbarLink__link">
        <NavbarLinkIcon features="padded">
          <Property label={schema.image}>
            <Property label={[schema.thumbnail, ontola.imgUrl64x64]} />
          </Property>
        </NavbarLinkIcon>
      </LDLink>
      <Property label={schema.email} />
    </div>
  );
};

PersonNavbar.type = schema.Person;

PersonNavbar.topology = navbarTopology;

PersonNavbar.propTypes = {
  subject: subjectType,
};

export default register(PersonNavbar);
