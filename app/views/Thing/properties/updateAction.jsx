import React from 'react';
import { Link } from 'react-router';
import { PropertyBase } from 'link-redux';

import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';

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
  NS.schema('Thing'),
  NS.schema('updateAction')
);

export default UpdateAction;
