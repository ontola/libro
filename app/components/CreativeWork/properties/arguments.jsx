import React from 'react';
import { LinkedObjectContainer, PropertyBase } from 'link-redux';

import LinkedRenderStore from '../../../helpers/LinkedRenderStore';

class Arguments extends PropertyBase {
  render() {
    return (
      <LinkedObjectContainer object={this.getLinkedObjectProperty()} />
    );
  }
}

LinkedRenderStore.registerRenderer(
  Arguments,
  'http://schema.org/CreativeWork',
  'http://schema.org/arguments'
);

export default Arguments;
