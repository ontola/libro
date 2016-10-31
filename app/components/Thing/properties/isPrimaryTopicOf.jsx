import React from 'react';
import { isDifferentOrigin } from 'link-lib';
import { PropertyBase } from 'link-redux';

import LinkedRenderStore from '../../../helpers/LinkedRenderStore';

class IsPrimaryTopicOf extends PropertyBase {
  render() {
    const href = this.getLinkedObjectProperty();
    if (!href) {
      return null;
    }
    const target = isDifferentOrigin(href) ? '_blank' : undefined;
    return (
      <a href={href} target={target}>External information</a>
    );
  }
}

LinkedRenderStore.registerRenderer(
  IsPrimaryTopicOf,
  'http://schema.org/Thing',
  'http://xmlns.com/foaf/0.1/isPrimaryTopicOf'
);

export default IsPrimaryTopicOf;
