import React, { PropTypes } from 'react';
import { getValueOrID } from 'link-lib';
import { LinkedObjectContainer, PropertyBase } from 'link-redux';

import LinkedRenderStore from '../../../helpers/LinkedRenderStore';
import {
  Columns,
} from 'components';

const propTypes = {
  /** The amount of items to render. Leave undefined for all items */
  limit: PropTypes.number,
};

class SingleMember extends PropertyBase {
  renderGrouped(groupBy) {
    const grouped = new Map();
    let objs = this.getLinkedObjectPropertyRaw();
    if (!(objs instanceof Array)) {
      objs = [objs];
    }
    objs.forEach((o) => {
      const val = o[groupBy] && o[groupBy][0]['@value'];
      if (typeof grouped[val] === 'undefined') {
        grouped[val] = [];
      }
      grouped[val].push(o);
    });
    const groups = Object.keys(grouped).filter(g => g !== '_c');
    return (
      <Columns>
        {groups.map(group => (
          <div key={`groupedmember${group}`}>
            {grouped[group].map(mem => (
              <LinkedObjectContainer
                key={`groupedmember${mem['@id']}`}
                object={mem['@id']}
                topology="collection"
              />
            ))}
          </div>
        ))}
      </Columns>
    );
  }

  render() {
    if (this.props.groupBy) {
      return
    }
    const groupBy = this.getLinkedObjectProperty('https://argu.co/ns/core#groupBy');
    if (typeof groupBy !== 'undefined') {
      return this.renderGrouped(groupBy);
    }
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

LinkedRenderStore.registerRenderer(
  SingleMember,
  'http://www.w3.org/ns/hydra/core#Collection',
  'http://www.w3.org/ns/hydra/core#member'
);

export default SingleMember;
