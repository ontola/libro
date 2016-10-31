import React from 'react';
import { Link } from 'react-router';
import { PropertyBase } from 'link-redux';

import LinkedRenderStore from '../../../helpers/LinkedRenderStore';

class UpdateAction extends PropertyBase {
  render() {
    return (
      <Link to={this.getLinkedObjectProperty('target')}>
        {this.getLinkedObjectProperty()}
      </Link>
    );
  }
}

LinkedRenderStore.registerRenderer(
  UpdateAction,
  'http://schema.org/Thing',
  'http://schema.org/updateAction'
);

export default UpdateAction;
