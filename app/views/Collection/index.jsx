import LinkedRenderStore from 'link-lib';
import { Property, PropertyBase } from 'link-redux';
import React from 'react';

class Collection extends PropertyBase {
  render() {
    const views = this.getLinkedObjectPropertyRaw('argu:views');
    const members = this.getLinkedObjectPropertyRaw('argu:members');
    const name = views ? <Property label="schema:name" /> : null;
    return (
      <div>
        {name}
        <Property
          forceRender
          label={views ? 'argu:views' : 'argu:members'}
          linkedProp={views || members}
        />
      </div>
    );
  }
}

LinkedRenderStore.registerRenderer(Collection, ['argu:Collection', 'hydra:Collection']);
LinkedRenderStore.registerRenderer(
  Collection,
  ['argu:Collection', 'hydra:Collection'],
  'collection'
);

export { default as Member } from './properties/member';
export { default as Name } from './properties/name';
export { default as Views } from './properties/views';
