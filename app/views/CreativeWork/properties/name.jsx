import { PropertyBase } from 'link-redux';
import React from 'react';

import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';
import {
  Heading,
  LDLink,
} from 'components';

class Name extends PropertyBase {
  getVariant() {
    switch (this.getLinkedObjectProperty(NS.rdf('type'))) {
      case 'https://argu.co/ns/core#Argument':
        return this.getLinkedObjectProperty(NS.schema('option')) === 'true' ? 'pro' : 'con';
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
  NS.schema('CreativeWork'),
  NS.schema('name')
);

LinkedRenderStore.registerRenderer(
  props => <LDLink><Name headerSize="3" {...props} /></LDLink>,
  NS.schema('CreativeWork'),
  NS.schema('name'),
  NS.argu('collection')
);

LinkedRenderStore.registerRenderer(
  props => <LDLink><Name headerSize="4" {...props} /></LDLink>,
  NS.schema('CreativeWork'),
  NS.schema('name'),
  NS.argu('section')
);

LinkedRenderStore.registerRenderer(
  ({ linkedProp }) => <span>{linkedProp}</span>,
  NS.schema('CreativeWork'),
  NS.schema('name'),
  NS.argu('parent')
);

export default Name;
