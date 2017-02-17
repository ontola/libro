import { PropertyBase } from 'link-redux';
import React from 'react';
import { Link } from 'react-router';

import {
  Heading,
} from 'components';

import LinkedRenderStore from '../../../helpers/LinkedRenderStore';

class CollectionName extends PropertyBase {
  render() {
    return (
      <Link to={this.getLinkedObjectProperty('argu:href')}>
        <Heading size="2" variant="column">
          {this.getLinkedObjectProperty()}
        </Heading>
      </Link>
    );
  }
}

LinkedRenderStore.registerRenderer(
  CollectionName,
  'argu:Collection',
  'http://schema.org/name'
);

export default CollectionName;
