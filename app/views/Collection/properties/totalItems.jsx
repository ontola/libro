import as from '@ontologies/as';
import { linkType } from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import LDLink from '../../../components/LDLink';
import Heading from '../../../components/Heading';
import CardContent from '../../../components/Card/CardContent';
import { cardAppendixTopology } from '../../../topologies/Card/CardAppendix';
import { allTopologiesExcept } from '../../../topologies';
import { buildRegister } from '../../../helpers/buildRegister';
import { CollectionTypes } from '../types';
import CardRow from '../../../topologies/Card/CardRow';
import { tableCellTopology } from '../../../topologies/TableCell';

const mapDataToProps = {
  first: as.first,
  last: as.last,
};

const defaultCollectionTotalItems = ({
  first,
  last,
  linkedProp,
  to,
}) => {
  if (linkedProp.value === '0' || first === last) {
    return null;
  }

  return (
    <LDLink to={to}>
      <Heading size="4">
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

defaultCollectionTotalItems.propTypes = {
  first: linkType,
  last: linkType,
  linkedProp: linkType,
  to: linkType,
};

const cardAppendixCollectionTotalItems = ({
  first,
  last,
  linkedProp,
}) => {
  if (linkedProp.value === '0' || first === last) {
    return null;
  }

  return (
    <CardRow backdrop>
      <CardContent>
        <LDLink>
          <Heading size="4">
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

cardAppendixCollectionTotalItems.propTypes = {
  first: linkType,
  last: linkType,
  linkedProp: linkType,
};

const registerTotalItems = buildRegister({
  property: as.totalItems,
  type: CollectionTypes,
});

export default [
  registerTotalItems(defaultCollectionTotalItems, {
    topology: allTopologiesExcept(cardAppendixTopology, tableCellTopology),
  }),
  registerTotalItems(cardAppendixCollectionTotalItems, {
    topology: cardAppendixTopology,
  }),
];
