import LinkedRenderStore from 'link-lib';
import { LinkedObjectContainer, PropertyBase } from 'link-redux';
import React from 'react';

class Creator extends PropertyBase {
  render() {
    const lop = this.getLinkedObjectProperty();
    const object = lop.includes('://') ? lop : `https://aod-search.argu.co/persons/${lop}`;
    return (
      <LinkedObjectContainer
        object={object}
        topology="voteBubble"
      />
    );
  }
}

LinkedRenderStore.registerRenderer(
  Creator,
  ['argu:Vote', 'aod:Vote', 'aod:Count'],
  ['schema:creator', 'aod:voter_id']
);
