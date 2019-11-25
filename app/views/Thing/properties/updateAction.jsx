import schema from '@ontologies/schema';
import LinkedRenderStore from 'link-lib';
import { PropertyBase } from 'link-redux';
import React from 'react';

import Link from '../../../components/Link';
import { primaryResourceTopology } from '../../../topologies/PrimaryResource';

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
  schema.Thing,
  schema.updateAction,
  primaryResourceTopology
);
