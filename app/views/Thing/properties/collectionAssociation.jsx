import LinkedRenderStore, { getP } from 'link-lib';
import {
  LinkedResourceContainer,
  Property,
  PropertyBase,
  withLinkCtx,
} from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';

class CollectionAssociation extends PropertyBase {
  getArguLinkedRecordURL() {
    return `https://argu.dev/lr?iri=${getP(this.context.schemaObject, '@id')}`;
  }

  shouldRenderLinkedURL(prop) {
    return prop
      && prop === 'https://beta.argu.co/vote_events/7b1fb5f4-68a3-e511-b86d-e4115babb880'
      && this.context.schemaObject
      && getP(this.context.schemaObject, NS.rdf('subject'));
  }

  render() {
    const prop = this.getLinkedObjectProperty();
    if (this.shouldRenderLinkedURL(prop)) {
      return (
        <LinkedResourceContainer subject={this.getArguLinkedRecordURL()}>
          <Property label={this.props.label} />
        </LinkedResourceContainer>
      );
    } else if (!prop) {
      return null;
    }
    return (
      <LinkedResourceContainer subject={prop} />
    );
  }
}

export default LinkedRenderStore.registerRenderer(
  withLinkCtx(CollectionAssociation),
  NS.schema('Thing'),
  [
    NS.argu('collectionAssociation'),
    NS.aod('counts'),
    NS.argu('topArgumentsPro'),
    NS.argu('topArgumentsCon'),
    NS.argu('motions'),
    NS.argu('questions'),
    NS.argu('bucket'),
  ]
);
