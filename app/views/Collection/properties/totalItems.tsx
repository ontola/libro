import * as as from '@ontologies/as';
import { NamedNode, SomeTerm } from '@ontologies/core';
import React, { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';

import CardContent from '../../../components/Card/CardContent';
import Heading, { HeadingSize } from '../../../components/Heading';
import LDLink from '../../../components/LDLink';
import { buildRegister } from '../../../helpers/buildRegister';
import { tryParseInt } from '../../../helpers/numbers';
import { allTopologiesExcept } from '../../../topologies';
import { cardAppendixTopology } from '../../../topologies/Card/CardAppendix';
import CardRow from '../../../topologies/Card/CardRow';
import { pageTopology } from '../../../topologies/Page';
import { tableCellTopology } from '../../../topologies/TableCell';
import { CollectionTypes } from '../types';

const mapDataToProps = {
  first: as.first,
  last: as.last,
};

interface CollectionTotalItemsProps {
  children?: ReactNode;
  first: SomeTerm;
  last: SomeTerm;
  linkedProp: SomeTerm;
  to: NamedNode;
}

const defaultCollectionTotalItems = ({
  first,
  last,
  linkedProp,
  to,
}: CollectionTotalItemsProps): JSX.Element | null => {
  if (tryParseInt(linkedProp) === 0 || first === last) {
    return null;
  }

  return (
    <LDLink to={to}>
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

defaultCollectionTotalItems.mapDataToProps = mapDataToProps;

const cardAppendixCollectionTotalItems = ({
  first,
  last,
  linkedProp,
}: CollectionTotalItemsProps): JSX.Element | null => {
  if (linkedProp.value === '0' || first === last) {
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

cardAppendixCollectionTotalItems.mapDataToProps = mapDataToProps;

const registerTotalItems = buildRegister<CollectionTotalItemsProps>({
  property: as.totalItems,
  type: CollectionTypes,
});

export default [
  registerTotalItems(defaultCollectionTotalItems, {
    topology: allTopologiesExcept(cardAppendixTopology, tableCellTopology, pageTopology),
  }),
  registerTotalItems(cardAppendixCollectionTotalItems, {
    topology: cardAppendixTopology,
  }),
];
