import LinkedRenderStore from 'link-lib';
import { LinkedResourceContainer, PropertyBase, lowLevel } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { Carousel } from '../../../components';
import { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  /** The amount of items to render. Leave undefined for all items */
  limit: PropTypes.number,
};

class MemberComp extends PropertyBase {
  memberList(prop) {
    const topology = this.context.topology ? this.context.topology : NS.argu('collection');
    return prop.slice(0, this.props.limit).map(iri => (
      <LinkedResourceContainer
        key={`${this.props.subject}:${iri.object.value}`}
        subject={iri.object}
        topology={topology}
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
    if (this.getLinkedObjectProperty(NS.argu('totalCount')).value === '0') {
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

const Member = lowLevel.linkedSubject(lowLevel.linkedVersion(MemberComp));

export default [
  LinkedRenderStore.registerRenderer(
    Member,
    NS.argu('Collection'),
    NS.argu('members')
  ),
  LinkedRenderStore.registerRenderer(
    Member,
    NS.argu('Collection'),
    NS.argu('members'),
    [
      NS.argu('section'),
      NS.argu('widget'),
      NS.argu('container')
    ]
  ),
  LinkedRenderStore.registerRenderer(
    props => <Carousel><Member {...props} /></Carousel>,
    CollectionTypes,
    NS.argu('members'),
    [
      NS.argu('grid'),
      NS.argu('widget'),
    ]
  ),
];
