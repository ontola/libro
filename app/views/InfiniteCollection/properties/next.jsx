import LinkedRenderStore from 'link-lib';
import { PropertyBase } from 'link-redux';
import { Literal, NamedNode, Statement } from 'rdflib';
import React from 'react';

import { allTopologies, NS } from '../../../helpers/LinkedRenderStore';
import { CardButton } from '../../../components';

class InfiniteCollectionNext extends PropertyBase {
  render() {
    const { linkedProp, subject, count } = this.props;
    const { linkedRenderStore } = this.context;

    const action = () => {
      const parent = this.getLinkedObjectPropertyRaw(NS.argu('parentView'))[0];
      const seqParent = linkedRenderStore.getResourcePropertyRaw(parent.object, NS.argu('views'))[0];
      linkedRenderStore.store.addStatements([
        new Statement(seqParent.object, NS.rdf(`_${count}`), new NamedNode(linkedProp)),
        new Statement(subject, NS.argu('void'), new Literal(0))
      ]);
      linkedRenderStore.broadcast();
    };

    return React.createElement(
      CardButton,
      { action },
      'Load more'
    );
  }
}

export default LinkedRenderStore.registerRenderer(
  InfiniteCollectionNext,
  NS.argu('InfiniteCollection'),
  NS.argu('next'),
  allTopologies
);

