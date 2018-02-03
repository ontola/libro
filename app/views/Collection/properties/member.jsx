import LinkedRenderStore, { getValueOrID } from 'link-lib';
import { LinkedResourceContainer, PropertyBase, lowLevel } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

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
        key={`${this.props.subject}:${getValueOrID(iri)}`}
        subject={iri.object}
        topology={topology}
      />
    ));
  }

  render() {
    const prop = this.getLinkedObjectPropertyRaw();
    if (this.getLinkedObjectProperty(NS.argu('totalCount')).value === '0') {
      return <div>Nog geen items</div>;
    } else if (Array.isArray(prop) && prop.length === 0) {
      return null;
    } else if (Array.isArray(prop)) {
      return (
        <div style={this.props.style}>
          {this.memberList(prop)}
        </div>
      );
    } else if (typeof prop.toArray !== 'undefined') {
      return (
        <div style={this.props.style}>
          {this.memberList(prop).toKeyedSeq()}
        </div>
      );
    }
    return <LinkedResourceContainer subject={this.getLinkedObjectProperty()} />;
  }
}

MemberComp.propTypes = propTypes;
MemberComp.contextTypes = {
  linkedRenderStore: PropTypes.object,
  topology: PropTypes.string,
};

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
    NS.argu('section')
  ),
];
