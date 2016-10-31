import React from 'react';
import { PropertyBase } from 'link-redux';

import {
  Heading,
} from 'components';
import LinkedRenderStore from '../../../helpers/LinkedRenderStore';

class Name extends PropertyBase {
  render() {
    return (
      <Heading size="1">{this.getLinkedObjectProperty()}</Heading>
    );
  }
}

LinkedRenderStore.registerRenderer(
  Name,
  'http://schema.org/Thing',
  [
    'http://schema.org/name',
    'http://www.w3.org/2000/01/rdf-schema#label',
    'http://xmlns.com/foaf/0.1/name',
  ]
);

export default Name;
