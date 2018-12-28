import {
  linkType,
  Property,
  register,
  subjectType,
} from 'link-redux';
import React from 'react';

import { HeaderLink } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import { tryParseInt } from '../../helpers/numbers';
import { headerTopology } from '../../topologies/Header';

import { CollectionTypes } from './types';

class CollectionSidebar extends React.PureComponent {
  static type = CollectionTypes;

  static topology = headerTopology;

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
      <HeaderLink
        count={tryParseInt(unreadCount)}
        icon="bell"
        label={<Property label={NS.as('name')} />}
        to={subject.value}
      />
    );
  }
}

export default register(CollectionSidebar);
