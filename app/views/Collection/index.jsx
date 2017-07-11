import LinkedRenderStore, { getValueOrID } from 'link-lib';
import { LinkedObjectContainer, Property, PropertyBase, RENDER_CLASS_NAME } from 'link-redux';
import React from 'react';
import { connect } from 'react-redux';

import { getPage } from '../../state/pagination/selectors';

const viewsOrMembers = (views, members, topology) => (
  <Property
    forceRender
    label={views ? 'argu:views' : 'argu:members'}
    linkedProp={views || members}
    topology={topology}
  />
);

class Collection extends PropertyBase {
  pagination() {
    const collectionIRI = this.getLinkedObjectProperty('argu:parentView');
    return <Property collectionIRI={collectionIRI} label="argu:first" />;
  }

  shouldComponentUpdate(nextProps) {
    return this.props.linkedProp !== nextProps.linkedProp ||
      this.props.currentPage !== nextProps.currentPage ||
      getValueOrID(this.props.data) !== getValueOrID(nextProps.data);
  }

  render() {
    let children;
    const views = this.getLinkedObjectPropertyRaw('argu:views');
    if (this.props.currentPage) {
      children = <LinkedObjectContainer object={this.props.currentPage} />;
    } else {
      children = viewsOrMembers(views, this.getLinkedObjectPropertyRaw('argu:members'));
    }
    const createAction = views ? undefined : <Property label="argu:createAction" />;
    const name = views ? <Property label="schema:name" /> : null;
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
      this.getLinkedObjectPropertyRaw('argu:views'),
      this.getLinkedObjectPropertyRaw('argu:members'),
      'section'
    );
  }
}

LinkedRenderStore.registerRenderer(ConnectedCollection, ['argu:Collection', 'hydra:Collection']);
LinkedRenderStore.registerRenderer(
  ConnectedCollection,
  ['argu:Collection', 'hydra:Collection'],
  'collection'
);
LinkedRenderStore.registerRenderer(
  CollectionSection,
  ['argu:Collection', 'hydra:Collection'],
  RENDER_CLASS_NAME,
  'section'
);

export { default as voteMatch } from './voteMatch';
export { default as First } from './properties/first';
export { default as Member } from './properties/member';
export { default as Name } from './properties/name';
export { default as CreateActionProp } from './properties/CreateActionProp';
export { default as Views } from './properties/views';
