import LinkedRenderStore from 'link-lib';
import { Property, PropertyBase, RENDER_CLASS_NAME } from 'link-redux';
import React from 'react';

const viewsOrMembers = (views, members, topology) => (
  <Property
    forceRender
    label={views ? 'argu:views' : 'argu:members'}
    linkedProp={views || members}
    topology={topology}
  />
);

class Collection extends PropertyBase {
  render() {
    const views = this.getLinkedObjectPropertyRaw('argu:views');
    const children = viewsOrMembers(views, this.getLinkedObjectPropertyRaw('argu:members'));
    const name = views ? <Property label="schema:name" /> : null;
    return (
      <div>
        {name}
        {children}
        {views ? undefined : <Property label="argu:createAction" />}
      </div>
    );
  }
}

class CollectionSection extends PropertyBase {
  render() {
    return viewsOrMembers(
      this.getLinkedObjectPropertyRaw('argu:views'),
      this.getLinkedObjectPropertyRaw('argu:members'),
      'section'
    );
  }
}

LinkedRenderStore.registerRenderer(Collection, ['argu:Collection', 'hydra:Collection']);
LinkedRenderStore.registerRenderer(
  Collection,
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
export { default as Member } from './properties/member';
export { default as Name } from './properties/name';
export { default as CreateActionProp } from './properties/CreateActionProp';
export { default as Views } from './properties/views';
