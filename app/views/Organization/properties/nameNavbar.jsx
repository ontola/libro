import foaf from '@ontologies/foaf';
import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import {
  Property,
  linkedPropType,
  register,
} from 'link-redux';
import React from 'react';

import argu from '../../../ontology/argu';
import { navbarTopology } from '../../../topologies/Navbar';

import './name.scss';

class OrganizationNameNavbar extends React.PureComponent {
  static type = [schema.Organization, argu.ns('Page'), schema.WebSite];

  static property = [
    schema.name,
    rdfs.label,
    foaf.name,
  ];

  static topology = navbarTopology;

  static propTypes = {
    linkedProp: linkedPropType,
  };

  render() {
    const { linkedProp } = this.props;

    return (
      <div className="OrganizationNameNavbar">
        <Property label={schema.image} />
        <span className="OrganizationNameNavbar__value NavbarLink__label">{linkedProp.value}</span>
      </div>
    );
  }
}

export default register(OrganizationNameNavbar);
