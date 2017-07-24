import { PropertyBase } from 'link-redux';
import React from 'react';

import LinkedRenderStore from '../../../helpers/LinkedRenderStore';
import {
  Heading,
  LDLink,
} from 'components';

class Name extends PropertyBase {
  getVariant() {
    switch (this.getLinkedObjectProperty('http://www.w3.org/1999/02/22-rdf-syntax-ns#type')) {
      case 'https://argu.co/ns/core#Argument':
        return this.getLinkedObjectProperty('schema:option') === 'true' ? 'pro' : 'con';
      default:
        return undefined;
    }
  }

  render() {
    const { headerSize } = this.props;
    return (
      <Heading size={headerSize} variant={this.getVariant()}>
        {this.getLinkedObjectProperty()}
      </Heading>
    );
  }
}

LinkedRenderStore.registerRenderer(
  props => <Name headerSize="1" {...props} />,
  'http://schema.org/CreativeWork',
  'http://schema.org/name'
);

LinkedRenderStore.registerRenderer(
  props => <LDLink><Name headerSize="3" {...props} /></LDLink>,
  'http://schema.org/CreativeWork',
  'http://schema.org/name',
  'argu:collection'
);

LinkedRenderStore.registerRenderer(
  props => <LDLink><Name headerSize="4" {...props} /></LDLink>,
  'http://schema.org/CreativeWork',
  'http://schema.org/name',
  'argu:section'
);

LinkedRenderStore.registerRenderer(
  ({ linkedProp }) => <span>{linkedProp}</span>,
  'http://schema.org/CreativeWork',
  'http://schema.org/name',
  'argu:parent'
);

export default Name;
