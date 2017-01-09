import React from 'react';
import { LinkedObjectContainer, Property, PropertyBase } from 'link-redux';

import LinkedRenderStore from '../../../helpers/LinkedRenderStore';

class CollectionAssociation extends PropertyBase {
  getArguLinkedRecordURL() {
    return `https://argu.local/lr?iri=${this.context.schemaObject['@id']}`;
  }

  render() {
    const prop = this.getLinkedObjectProperty();
    if (!prop && this.context.schemaObject && this.context.schemaObject['@id']) {
      return (
        <LinkedObjectContainer object={this.getArguLinkedRecordURL()}>
          <Property label={this.props.label} />
        </LinkedObjectContainer>
      );
    } else if (!prop) {
      return null;
    }
    return (
      <LinkedObjectContainer object={prop} />
    );
  }
}

LinkedRenderStore.registerRenderer(
  CollectionAssociation,
  'http://schema.org/Thing',
  [
    'https://argu.co/ns/core#collectionAssociation',
    'argu:voteEvents',
    'aod:counts',
    'argu:topArgumentsPro',
    'argu:topArgumentsCon',
  ]
);

export default CollectionAssociation;
