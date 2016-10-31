import React from 'react';
import { PropertyBase } from 'link-redux';

import LinkedRenderStore from '../../../helpers/LinkedRenderStore';

class Text extends PropertyBase {
  render() {
    return (
      <p>
        {this.getLinkedObjectProperty()}
      </p>
    );
  }
}

LinkedRenderStore.registerRenderer(
  Text,
  'http://schema.org/CreativeWork',
  'http://schema.org/text'
);

export default Text;
