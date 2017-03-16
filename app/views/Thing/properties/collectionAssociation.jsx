import React from 'react';
import { getP } from 'link-lib';
import { LinkedObjectContainer, Property, PropertyBase } from 'link-redux';

import LinkedRenderStore from '../../../helpers/LinkedRenderStore';

class CollectionAssociation extends PropertyBase {
  getArguLinkedRecordURL() {
    return `https://argu.dev/lr?iri=${getP(this.context.schemaObject, '@id')}`;
  }

  shouldRenderLinkedURL(prop) {
    return prop &&
      prop === 'https://beta.argu.co/vote_events/7b1fb5f4-68a3-e511-b86d-e4115babb880' &&
      this.context.schemaObject &&
      getP(this.context.schemaObject, '@id');
  }

  render() {
    const prop = this.getLinkedObjectProperty();
    if (this.shouldRenderLinkedURL(prop)) {
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
    'aod:counts',
    'argu:topArgumentsPro',
    'argu:topArgumentsCon',
    'argu:motions',
    'argu:questions',
    'argu:bucket',
  ]
);

export default CollectionAssociation;
