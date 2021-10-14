import * as as from '@ontologies/as';
import rdf from '@ontologies/core';
import {
  PropertyProps,
  register,
  useLRS,
  useProperty,
} from 'link-redux';
import { SubjectProp } from 'link-redux/dist-types/types';
import React, { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';

import { ButtonVariant } from '../../../components/Button';
import ButtonWithFeedback from '../../../components/ButtonWithFeedback';
import argu from '../../../ontology/argu';
import ontola from '../../../ontology/ontola';
import { allTopologies } from '../../../topologies';

interface InfiniteCollectionNextProps extends SubjectProp, PropertyProps {}

const InfiniteCollectionNext = ({
  linkedProp,
  subject,
}: InfiniteCollectionNextProps): JSX.Element => {
  const lrs = useLRS();
  const [partOf] = useProperty(as.partOf);

  const onClick = useCallback(
    () => new Promise(() => {
      lrs.store.addQuads([
        rdf.quad(partOf, ontola.pages, linkedProp),
        rdf.quad(subject, argu.void, rdf.literal(0)),
      ]);
      (lrs as any).broadcast();
    }),
    [lrs, partOf, linkedProp, subject],
  );

  return (
    <ButtonWithFeedback
      variant={ButtonVariant.Neutral}
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

export default register(InfiniteCollectionNext);
