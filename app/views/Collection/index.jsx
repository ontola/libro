import { RENDER_CLASS_NAME } from 'link-lib';
import {
  getValueOrID,
  LinkedObjectContainer,
  Property,
  PropertyBase,
} from 'link-redux';
import React from 'react';
import { connect } from 'react-redux';

import LinkedRenderStore, { NS } from '../../helpers/LinkedRenderStore';
import { getPage } from '../../state/pagination/selectors';

const viewsOrMembers = (views, members, topology) => (
  <Property
    forceRender
    label={views ? NS.argu('views') : NS.argu('members')}
    linkedProp={views || members}
    topology={topology}
  />
);

class Collection extends PropertyBase {
  pagination() {
    const collectionIRI = this.getLinkedObjectProperty(NS.argu('parentView'));
    return <Property collectionIRI={collectionIRI} label={NS.argu('first')} />;
  }

  shouldComponentUpdate(nextProps) {
    return this.props.linkedProp !== nextProps.linkedProp ||
      this.props.currentPage !== nextProps.currentPage ||
      getValueOrID(this.props.data) !== getValueOrID(nextProps.data);
  }

  render() {
    let children;
    const views = this.getLinkedObjectPropertyRaw(NS.argu('views'));
    if (this.props.currentPage) {
      children = <LinkedObjectContainer object={this.props.currentPage} />;
    } else {
      children = viewsOrMembers(views, this.getLinkedObjectPropertyRaw(NS.argu('members')));
    }
    const createAction = views ? undefined : <Property label={NS.argu('createAction')} />;
    const name = views ? <Property label={NS.schema('name')} /> : null;
    const pagination = !views ? this.pagination() : null;

    return (
      <div>
        {name}
        {children}
        {pagination}
        {createAction}
      </div>
    );
  }
}

const ConnectedCollection = connect(
  (state, { subject }) => ({
    currentPage: getPage(state, subject)
  })
)(Collection);

class CollectionSection extends PropertyBase {
  render() {
    return viewsOrMembers(
      this.getLinkedObjectPropertyRaw(NS.argu('views')),
      this.getLinkedObjectPropertyRaw(NS.argu('members')),
      NS.argu('section')
    );
  }
}

LinkedRenderStore.registerRenderer(ConnectedCollection, [NS.argu('Collection'), NS.hydra('Collection')]);
LinkedRenderStore.registerRenderer(
  ConnectedCollection,
  [NS.argu('Collection'), NS.hydra('Collection')],
  NS.argu('collection')
);
LinkedRenderStore.registerRenderer(
  CollectionSection,
  [NS.argu('Collection'), NS.hydra('Collection')],
  RENDER_CLASS_NAME,
  NS.argu('section')
);

export { default as voteMatch } from './voteMatch';
export { default as First } from './properties/first';
export { default as Member } from './properties/member';
export { default as Name } from './properties/name';
export { default as CreateActionProp } from './properties/CreateActionProp';
export { default as Views } from './properties/views';
