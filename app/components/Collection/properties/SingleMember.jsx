import React, { PropTypes } from 'react';
import { getValueOrID } from 'link-lib';
import { LinkedObjectContainer, PropertyBase } from 'link-redux';

const propTypes = {
  /** The amount of items to render. Leave undefined for all items */
  limit: PropTypes.number,
};

class SingleMember extends PropertyBase {
  render() {
    const prop = this.getLinkedObjectPropertyRaw();
    if (typeof prop === 'undefined') {
      return null;
    } else if (prop instanceof Array) {
      return (<div style={this.props.style}>
        {prop.slice(0, this.props.limit).map(iri => (
          <LinkedObjectContainer
            key={`${getValueOrID(this.context.schemaObject)}:${getValueOrID(iri)}`}
            object={getValueOrID(iri)}
            topology="collection"
          />
        ))}
      </div>);
    }
    return <LinkedObjectContainer object={this.getLinkedObjectProperty()} topology="collection" />;
  }
}

SingleMember.propTypes = propTypes;

export default SingleMember;
