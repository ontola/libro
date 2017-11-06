import {
  lowLevel,
  Property,
  PropertyBase,
} from 'link-redux';
import React from 'react';

import LinkedRenderStore, { NS } from '../../helpers/LinkedRenderStore';
import './sidebar';

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

LinkedRenderStore.registerRenderer(ConnectedCollection, [NS.argu('InfiniteCollection')]);

export { default as Member } from './properties/members';
export { default as UnreadCount } from './properties/unreadCount';
export { default as Views } from './properties/views';
