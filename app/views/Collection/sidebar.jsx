import {
  linkType,
  Property,
  register,
  subjectType,
} from 'link-redux';
import React from 'react';

import { SideBarLink } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import { tryParseInt } from '../../helpers/numbers';
import { sidebarTopology } from '../../topologies/Sidebar';

import { CollectionTypes } from './types';

class CollectionSidebar extends React.PureComponent {
  static type = CollectionTypes;

  static topology = sidebarTopology;

  static mapDataToProps = [
    NS.argu('unreadCount'),
    NS.schema('name'),
  ];

  static propTypes = {
    subject: subjectType,
    unreadCount: linkType,
  };

  render() {
    const { subject, unreadCount } = this.props;

    return (
      <SideBarLink
        count={tryParseInt(unreadCount)}
        icon="bell"
        label={<Property label={NS.as('name')} />}
        to={subject.value}
      />
    );
  }
}

export default register(CollectionSidebar);
