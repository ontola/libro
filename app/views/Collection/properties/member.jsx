import LinkedRenderStore from 'link-lib';
import { LinkedResourceContainer, PropertyBase, withLinkCtx } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { Carousel } from '../../../components';
import { NS } from '../../../helpers/LinkedRenderStore';
import { CollectionTypes } from '../types';

const propTypes = {
  /** The amount of items to render. Leave undefined for all items */
  limit: PropTypes.number,
};

class MemberComp extends PropertyBase {
  memberList(prop) {
    return prop.slice(0, this.props.limit).map(iri => (
      <LinkedResourceContainer
        key={`${this.props.subject}:${iri.object.value}`}
        subject={iri.object}
        topology={this.context.topology}
      />
    ));
  }

  styleWrapper(memberList) {
    if (this.props.style && this.props.style !== {}) {
      return (
        <div style={this.props.style}>
          {memberList}
        </div>
      );
    }
    return memberList;
  }

  render() {
    const prop = this.getLinkedObjectPropertyRaw();
    if (this.getLinkedObjectProperty(NS.as('totalItems')).value === '0') {
      return <div>Nog geen items</div>;
    } else if (Array.isArray(prop) && prop.length === 0) {
      return null;
    } else if (Array.isArray(prop)) {
      return this.styleWrapper(this.memberList(prop));
    } else if (typeof prop.toArray !== 'undefined') {
      return this.styleWrapper(this.memberList(prop).toKeyedSeq());
    }
    return <LinkedResourceContainer subject={this.getLinkedObjectProperty()} />;
  }
}

MemberComp.propTypes = propTypes;

const Member = withLinkCtx(MemberComp);

export default [
  LinkedRenderStore.registerRenderer(
    Member,
    CollectionTypes,
    NS.as('items')
  ),
  LinkedRenderStore.registerRenderer(
    Member,
    CollectionTypes,
    NS.as('items'),
    [
      NS.argu('cardList'),
      NS.argu('widget'),
      NS.argu('container'),
    ]
  ),
  LinkedRenderStore.registerRenderer(
    props => <Carousel><Member {...props} /></Carousel>,
    CollectionTypes,
    NS.as('items'),
    [
      NS.argu('grid'),
      NS.argu('widget'),
    ]
  ),
];
