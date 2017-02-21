import LinkedRenderStore, { getValueOrID } from 'link-lib';
import { LinkedObjectContainer, PropertyBase } from 'link-redux';
import React, { PropTypes } from 'react';

const propTypes = {
  /** The amount of items to render. Leave undefined for all items */
  limit: PropTypes.number,
};

class Member extends PropertyBase {
  memberList(prop) {
    const topology = this.context.topology ? this.context.topology : 'collection';
    return prop.slice(0, this.props.limit).map(iri => (
      <LinkedObjectContainer
        key={`${getValueOrID(this.context.schemaObject)}:${getValueOrID(iri)}`}
        object={getValueOrID(iri)}
        topology={topology}
      />
    ));
  }

  render() {
    const prop = this.getLinkedObjectPropertyRaw();
    if (this.getLinkedObjectProperty('argu:totalCount') === 0) {
      return <div>Nog geen items</div>;
    } else if (typeof prop === 'undefined') {
      return null;
    } else if (prop instanceof Array) {
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
    return <LinkedObjectContainer object={this.getLinkedObjectProperty()} />;
  }
}

Member.propTypes = propTypes;
Member.contextTypes = {
  linkedRenderStore: PropTypes.object,
  schemaObject: PropTypes.object,
  topology: PropTypes.string,
};

LinkedRenderStore.registerRenderer(
  Member,
  'argu:Collection',
  'argu:members'
);
LinkedRenderStore.registerRenderer(
  Member,
  'argu:Collection',
  'argu:members',
  'section'
);

export default Member;
