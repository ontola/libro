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
import Next from './properties/next';
import UnreadCount from './properties/unreadCount';
import Views from './properties/views';

class Collection extends PropertyBase {
  shouldComponentUpdate(nextProps) {
    return this.props.subject !== nextProps.subject
      || this.props.version !== nextProps.version
      || this.props.last !== nextProps.last;
  }

  viewsOrMembers(views) {
    if (!views) {
      let header, next;
      if (this.context.subject.value === this.props.first.value) {
        header = <Property label={[NS.schema('name'), NS.rdfs('label')]} />;
      }
      if (this.context.subject.value === this.props.last.value) {
        next = <Property count={this.props.count} label={NS.argu('next')} />;
      }
      return (
        <div>
          {header}
          <Property forceRender label={NS.argu('members')} />
          {next}
        </div>
      );
    }
    return (
      <Property forceRender label={NS.argu('views')} />
    );
  }

  render() {
    const views = this.getLinkedObjectPropertyRaw(NS.argu('views'));
    return this.viewsOrMembers(views);
  }
}

const ConnectedCollection = lowLevel.linkedSubject(lowLevel.linkedVersion(Collection));

export default [
  LinkedRenderStore.registerRenderer(ConnectedCollection, [NS.argu('InfiniteCollection')]),
  ...Member,
  Next,
  UnreadCount,
  ...Views,
];
