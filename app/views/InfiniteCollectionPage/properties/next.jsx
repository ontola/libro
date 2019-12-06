import as from '@ontologies/as';
import rdf from '@ontologies/core';
import {
  linkedPropType,
  register,
  subjectType,
  useLRS,
} from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import ButtonWithFeedback from '../../../components/ButtonWithFeedback';
import { NS } from '../../../helpers/LinkedRenderStore';
import ontola from '../../../ontology/ontola';
import { allTopologies } from '../../../topologies';

const InfiniteCollectionNext = ({
  linkedProp,
  partOf,
  subject,
}) => {
  const lrs = useLRS();
  const onClick = () => new Promise(() => {
    lrs.store.addQuads([
      rdf.quad(partOf.object, ontola.pages, linkedProp),
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
};

InfiniteCollectionNext.type = ontola.InfiniteView;

InfiniteCollectionNext.property = as.next;

InfiniteCollectionNext.topology = allTopologies;

InfiniteCollectionNext.mapDataToProps = {
  partOf: as.partOf,
};

InfiniteCollectionNext.linkOpts = {
  returnType: 'statement',
};

InfiniteCollectionNext.propTypes = {
  linkedProp: linkedPropType,
  partOf: linkedPropType,
  subject: subjectType,
};

export default register(InfiniteCollectionNext);
