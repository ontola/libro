import LinkedRenderStore from 'link-lib';
import { LinkedObjectContainer, PropertyBase, RENDER_CLASS_TYPE } from 'link-redux';
import React from 'react';

class Creator extends PropertyBase {
  render () {
    return (
      <LinkedObjectContainer
        object={this.getLinkedObjectProperty()}
        topology="voteBubble"
      />
    );
  }
}

LinkedRenderStore.registerRenderer(Creator, 'argu:Vote', 'schema:creator');
