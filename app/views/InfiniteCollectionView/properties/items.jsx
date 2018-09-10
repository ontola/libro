import LinkedRenderStore from 'link-lib';
import { LinkedResourceContainer, PropertyBase, withLinkCtx } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { collectionTopology } from '../../../topologies/Collection';

const propTypes = {
  /** The amount of items to render. Leave undefined for all items */
  limit: PropTypes.number,
};

class ItemsComp extends PropertyBase {
  memberList(prop) {
    const {
      direction,
      divider,
      limit,
      subject,
      topology = collectionTopology,
    } = this.props;

    const list = prop.slice(0, limit);
    if (direction === 'inverted') {
      list.reverse();
    }
    const dividerView = divider ? <div className="Dropdown__divider" /> : undefined;

    return list.map(iri => (
      <div key={`${subject}:${iri.value}`}>
        <LinkedResourceContainer
          subject={iri.object}
          topology={topology}
        />
        {dividerView}
      </div>
    ));
  }

  render() {
    const prop = this.getLinkedObjectPropertyRaw();
    if (this.getLinkedObjectProperty(NS.as('totalItems')).value === '0') {
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

ItemsComp.propTypes = propTypes;

const Items = withLinkCtx(ItemsComp);
export default [
  LinkedRenderStore.registerRenderer(
    Items,
    NS.argu('InfiniteCollection'),
    NS.as('items')
  ),
  LinkedRenderStore.registerRenderer(
    props => <Items divider direction="inverted" {...props} />,
    NS.argu('InfiniteCollection'),
    NS.as('items'),
    NS.argu('sidebar')
  ),
];
