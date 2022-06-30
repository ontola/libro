import * as as from '@ontologies/as';
import { NamedNode, SomeTerm } from '@ontologies/core';
import { useProperty } from 'link-redux';
import React, { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';

import { allTopologiesExcept } from '../../../../../topologies';
import CardContent from '../../../../Common/components/Card/CardContent';
import Detail from '../../../../Common/components/Detail';
import Heading, { HeadingSize } from '../../../../Common/components/Heading';
import LDLink from '../../../../Common/components/LDLink';
import { buildRegister } from '../../../../Common/lib/buildRegister';
import retrievePath from '../../../../Common/lib/iris';
import { tryParseInt } from '../../../../Common/lib/numbers';
import { cardAppendixTopology } from '../../../../Common/topologies/Card/CardAppendix';
import CardRow from '../../../../Common/topologies/Card/CardRow';
import { detailsBarTopology } from '../../../../Common/topologies/DetailsBar';
import { pageTopology } from '../../../../Common/topologies/Page';
import { tableCellTopology } from '../../../../Table/topologies/TableCell';
import { CollectionTypes } from '../types';

const useIsSinglePage = () => {
  const [first] = useProperty(as.first);
  const [last] = useProperty(as.last);

  return first === last;
};

interface CollectionTotalItemsProps {
  children?: ReactNode;
  linkedProp: SomeTerm;
  subject: NamedNode;
  to: NamedNode;
}

const DefaultCollectionTotalItems = ({
  linkedProp,
  to,
}: CollectionTotalItemsProps): JSX.Element | null => {
  const isSinglePage = useIsSinglePage();

  if (tryParseInt(linkedProp) === 0 || isSinglePage) {
    return null;
  }

  return (
    <LDLink to={to?.value}>
      <Heading size={HeadingSize.SM}>
        <FormattedMessage
          defaultMessage="View all {count}..."
          id="https://app.argu.co/i18n/collection/readAll"
          values={{ count: linkedProp.value }}
        />
      </Heading>
    </LDLink>
  );
};

const CardAppendixCollectionTotalItems = ({
  linkedProp,
}: CollectionTotalItemsProps): JSX.Element | null => {
  const isSinglePage = useIsSinglePage();

  if (linkedProp.value === '0' || isSinglePage) {
    return null;
  }

  return (
    <CardRow backdrop>
      <CardContent>
        <LDLink>
          <Heading size={HeadingSize.SM}>
            <FormattedMessage
              defaultMessage="View all {count}..."
              id="https://app.argu.co/i18n/collection/readAll"
              values={{ count: linkedProp.value }}
            />
          </Heading>
        </LDLink>
      </CardContent>
    </CardRow>
  );
};

const DetailsBarCollectionTotalItems = ({
  linkedProp,
  subject,
}: CollectionTotalItemsProps): JSX.Element | null => {
  const isSinglePage = useIsSinglePage();

  if (linkedProp.value === '0' || isSinglePage) {
    return null;
  }

  return (
    <Detail
      text={(
        <FormattedMessage
          defaultMessage="View all {count}..."
          id="https://app.argu.co/i18n/collection/readAll"
          values={{ count: linkedProp.value }}
        />
      )}
      url={retrievePath(subject)}
    />
  );
};

const registerTotalItems = buildRegister<CollectionTotalItemsProps>({
  property: as.totalItems,
  type: CollectionTypes,
});

export default [
  registerTotalItems(DefaultCollectionTotalItems, {
    topology: allTopologiesExcept(
      cardAppendixTopology,
      detailsBarTopology,
      tableCellTopology,
      pageTopology,
    ),
  }),
  registerTotalItems(CardAppendixCollectionTotalItems, {
    topology: cardAppendixTopology,
  }),
  registerTotalItems(DetailsBarCollectionTotalItems, {
    topology: detailsBarTopology,
  }),
];
