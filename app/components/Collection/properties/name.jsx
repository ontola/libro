import React from 'react';
import { Link } from 'react-router';
import { PropertyBase } from 'link-redux';

import LinkedRenderStore from '../../../helpers/LinkedRenderStore';
import {
  Heading,
} from 'components';

class Name extends PropertyBase {
  render() {
    return (
      <Link to={this.getLinkedObjectProperty('argu:href')}>
        <Heading size="2">
          {this.getLinkedObjectProperty()}
        </Heading>
      </Link>
    );
  }
}

LinkedRenderStore.registerRenderer(
  Name,
  'http://www.w3.org/ns/hydra/core#Collection',
  'http://schema.org/name'
);


export default Name;
