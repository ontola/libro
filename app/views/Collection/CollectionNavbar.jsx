import schema from '@ontologies/schema';
import {
  linkType,
  register,
  subjectType,
} from 'link-redux';
import React from 'react';

import { NavbarLink } from '../../components';
import { tryParseInt } from '../../helpers/numbers';
import argu from '../../ontology/argu';
import { navbarTopology } from '../../topologies/Navbar';

import { CollectionTypes } from './types';

class CollectionNavbar extends React.PureComponent {
  static type = CollectionTypes;

  static topology = navbarTopology;

  static mapDataToProps = {
    name: schema.name,
    unreadCount: argu.unreadCount,
  };

  static propTypes = {
    subject: subjectType,
    unreadCount: linkType,
  };

  render() {
    const { subject, unreadCount } = this.props;

    return (
      <NavbarLink
        count={tryParseInt(unreadCount)}
        icon="bell"
        to={subject.value}
      />
    );
  }
}

export default register(CollectionNavbar);
