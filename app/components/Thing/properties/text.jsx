import React from 'react';
import Markdown from 'react-remarkable';
import { PropertyBase } from 'link-redux';

import LinkedRenderStore from '../../../helpers/LinkedRenderStore';

class Text extends PropertyBase {
  render() {
    return (
      <Markdown source={this.getLinkedObjectProperty()} />
    );
  }
}

LinkedRenderStore.registerRenderer(
  Text,
  'http://schema.org/Thing',
  'http://schema.org/text'
);

export default Text;
