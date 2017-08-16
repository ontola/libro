import { PropertyBase } from 'link-redux';
import React from 'react';
import { Link } from 'react-router';

import {
  Heading,
} from 'components';

import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';

class CollectionName extends PropertyBase {
  render() {
    return (
      <Link to={this.getLinkedObjectProperty(NS.argu('href'))}>
        <Heading size="2" variant="column">
          {this.getLinkedObjectProperty()}
        </Heading>
      </Link>
    );
  }
}

LinkedRenderStore.registerRenderer(
  CollectionName,
  NS.argu('Collection'),
  NS.schema('name')
);

export default CollectionName;
