import React from 'react';
import LinkedRenderStore from 'link-lib';
import { Property, PropertyBase } from 'link-redux';

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

export { default as Member } from './properties/member';
export { default as Name } from './properties/name';
export { default as Views } from './properties/views';
