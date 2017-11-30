import LinkedRenderStore from 'link-lib';
import {
  lowLevel,
  Property,
  PropertyBase,
} from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';

import './sidebar';
import Member from './properties/members';
import UnreadCount from './properties/unreadCount';
import Views from './properties/views';

const viewsOrMembers = views => (
  <Property
    forceRender
    label={views ? NS.argu('views') : NS.argu('members')}
  />
);

class Collection extends PropertyBase {
  render() {
    const views = this.getLinkedObjectPropertyRaw(NS.argu('views'));
    return viewsOrMembers(views);
  }
}

const ConnectedCollection = lowLevel.linkedSubject(lowLevel.linkedVersion(Collection));

export default [
  LinkedRenderStore.registerRenderer(ConnectedCollection, [NS.argu('InfiniteCollection')]),
  ...Member,
  UnreadCount,
  ...Views,
];
