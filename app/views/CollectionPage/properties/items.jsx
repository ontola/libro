import LinkedRenderStore from 'link-lib';
import { LinkedResourceContainer, PropertyBase, link } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import Grid from '../../../topologies/Grid';
import { CollectionViewTypes } from '../types';
import Container, { containerTopology } from '../../../topologies/Container';
import { primaryResourceTopology } from '../../../topologies/PrimaryResource';

const propTypes = {
  /** The amount of items to render. Leave undefined for all items */
  renderLimit: PropTypes.number,
};

export const collectionDisplayWrapper = (collectionDisplay, memberList, topology) => {
  if (collectionDisplay === NS.argu('collectionDisplay/grid')) {
    return (
      <Grid>
        {memberList}
      </Grid>
    );
  }

  if (collectionDisplay === NS.argu('collectionDisplay/default') && topology !== containerTopology) {
    return (
      <Container>
        {memberList}
      </Container>
    );
  }

  return memberList;
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

    return collectionDisplayWrapper(this.props.collectionDisplay, memberList, this.props.topology);
  }

  render() {
    const { items, totalCount } = this.props;
    let children = null;

    if (totalCount.value === '0') {
      children = <div>Nog geen items</div>;
    } else if (Array.isArray(items) && items.length === 0) {
      children = null;
    } else if (Array.isArray(items)) {
      children = this.memberList();
    } else if (typeof items.toArray !== 'undefined') {
      children = this.memberList().toKeyedSeq();
    } else {
      children = <LinkedResourceContainer subject={this.getLinkedObjectProperty()} />;
    }

    return this.styleWrapper(children);
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
    NS.as('items'),
    [
      undefined,
      primaryResourceTopology,
      NS.argu('cardList'),
      NS.argu('widget'),
      NS.argu('container'),
    ]
  ),
];
