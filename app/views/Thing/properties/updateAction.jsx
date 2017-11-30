import LinkedRenderStore from 'link-lib';
import { PropertyBase } from 'link-redux';
import React from 'react';
import { Link } from 'react-router-dom';

import { NS } from '../../../helpers/LinkedRenderStore';

class UpdateAction extends PropertyBase {
  render() {
    return (
      <Link to={this.getLinkedObjectProperty('target')}>
        {this.getLinkedObjectProperty()}
      </Link>
    );
  }
}

export default LinkedRenderStore.registerRenderer(
  UpdateAction,
  NS.schema('Thing'),
  NS.schema('updateAction')
);
