import LinkedRenderStore from 'link-lib';
import { PropertyBase, link } from 'link-redux';
import { Literal, Statement } from 'rdflib';
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
        new Statement(partOf.object, NS.ontola('pages'), linkedProp),
        new Statement(subject, NS.argu('void'), new Literal(0)),
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
  link([NS.as('partOf')], { returnType: 'statement' })(InfiniteCollectionNext),
  NS.ontola('InfiniteView'),
  NS.as('next'),
  allTopologies
);
