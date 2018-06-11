import LinkedRenderStore from 'link-lib';
import { link, PropertyBase } from 'link-redux';
import { Literal, Statement } from 'rdflib';
import React from 'react';

import ButtonWithFeedback from '../../../components/ButtonWithFeedback';
import { allTopologies, NS } from '../../../helpers/LinkedRenderStore';

class InfiniteCollectionNext extends PropertyBase {
  render() {
    const {
      linkedProp,
      lrs,
      partOf,
      subject,
    } = this.props;

    const onClick = () => new Promise(() => {
      lrs.store.addStatements([
        new Statement(partOf.object, NS.as('pages'), linkedProp),
        new Statement(subject, NS.argu('void'), new Literal(0))
      ]);
      lrs.broadcast();
    });

    return (
      <ButtonWithFeedback
        theme="box"
        onClick={onClick}
      >
        Load more
      </ButtonWithFeedback>
    );
  }
}

export default LinkedRenderStore.registerRenderer(
  link([NS.as('partOf')], { returnType: 'statement' })(InfiniteCollectionNext),
  NS.argu('InfiniteCollectionView'),
  NS.as('next'),
  allTopologies
);

