import LinkedRenderStore from 'link-lib';
import { LinkedResourceContainer, PropertyBase, link } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import Grid from '../../../topologies/Grid';
import { CollectionViewTypes } from '../types';

const propTypes = {
  /** The amount of items to render. Leave undefined for all items */
  renderLimit: PropTypes.number,
};

class ItemsComp extends PropertyBase {
  memberList() {
    return this.props.items
      .slice(0, this.props.renderLimit)
      .map(iri => (
        <LinkedResourceContainer
          key={`${this.props.subject}:${iri.value}`}
          subject={iri}
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
    const { items, totalCount } = this.props;
    if (totalCount.value === '0') {
      return <div>Nog geen items</div>;
    } else if (Array.isArray(items) && items.length === 0) {
      return null;
    } else if (Array.isArray(items)) {
      return this.styleWrapper(this.memberList());
    } else if (typeof items.toArray !== 'undefined') {
      return this.styleWrapper(this.memberList().toKeyedSeq());
    }
    return <LinkedResourceContainer subject={this.getLinkedObjectProperty()} />;
  }
}

ItemsComp.propTypes = propTypes;

const Items = link({
  items: {
    label: NS.as('items'),
    limit: Infinity,
  },
  totalCount: NS.as('totalItems'),
})(ItemsComp);

export default [
  LinkedRenderStore.registerRenderer(
    Items,
    CollectionViewTypes,
    NS.as('items')
  ),
  LinkedRenderStore.registerRenderer(
    Items,
    CollectionViewTypes,
    NS.as('items'),
    [
      NS.argu('cardList'),
      NS.argu('widget'),
      NS.argu('container'),
    ]
  ),
  LinkedRenderStore.registerRenderer(
    props => <Grid><Items {...props} /></Grid>,
    CollectionViewTypes,
    NS.as('items'),
    [
      NS.argu('grid'),
      NS.argu('widget'),
    ]
  ),
];
