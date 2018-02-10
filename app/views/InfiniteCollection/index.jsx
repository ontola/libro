import LinkedRenderStore from 'link-lib';
import {
  lowLevel,
  Property,
  PropertyBase,
} from 'link-redux';
import React from 'react';

import { Container, WidgetTopology } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';

import sidebar from './sidebar';
import Member from './properties/members';
import Next from './properties/next';
import UnreadCount from './properties/unreadCount';
import Views from './properties/views';

class InfiniteCollection extends PropertyBase {
  shouldComponentUpdate(nextProps) {
    return this.props.subject !== nextProps.subject
      || this.props.version !== nextProps.version
      || this.props.last !== nextProps.last;
  }

  viewsOrMembers(views) {
    if (views.length === 0) {
      let header, next;
      if (this.props.subject.value === this.props.first.value) {
        header = <Property label={[NS.schema('name'), NS.rdfs('label')]} />;
      }
      if (this.props.subject.value === this.props.last.value) {
        next = <Property count={this.props.count} label={NS.argu('next')} />;
      }
      return (
        <Container>
          <WidgetTopology>
            {header}
          </WidgetTopology>
          <Property forceRender label={NS.argu('members')} />
          {next}
        </Container>
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

const ConnectedInfiniteCollection =
  lowLevel.linkedSubject(lowLevel.linkedVersion(InfiniteCollection));

export default [
  LinkedRenderStore.registerRenderer(ConnectedInfiniteCollection, NS.argu('InfiniteCollection')),
  sidebar,
  ...Member,
  Next,
  UnreadCount,
  ...Views,
];
