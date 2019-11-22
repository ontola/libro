import rdf from '@ontologies/core';
import LinkedRenderStore from 'link-lib';
import { PropertyBase, link } from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import ButtonWithFeedback from '../../../components/ButtonWithFeedback';
import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologies } from '../../../topologies';

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
        rdf.quad(partOf.object, NS.ontola('pages'), linkedProp),
        rdf.quad(subject, NS.argu('void'), rdf.literal(0)),
      ]);
      lrs.broadcast();
    });

    return (
      <ButtonWithFeedback
        theme="box"
        onClick={onClick}
      >
        <FormattedMessage
          defaultMessage="Load more"
          id="https://app.argu.co/i18n/collection/loadMore"
        />
      </ButtonWithFeedback>
    );
  }
}

export default LinkedRenderStore.registerRenderer(
  link({ partOf: NS.as('partOf') }, { returnType: 'statement' })(InfiniteCollectionNext),
  NS.ontola('InfiniteView'),
  NS.as('next'),
  allTopologies
);
