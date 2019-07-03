import { linkType } from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { NS } from '../../../helpers/LinkedRenderStore';
import LDLink from '../../../components/LDLink';
import Heading from '../../../components/Heading';
import CardContent from '../../../components/Card/CardContent';
import { cardAppendixTopology } from '../../../topologies/Card/CardAppendix';
import { allTopologiesExcept } from '../../../topologies';
import { buildRegister } from '../../../helpers/buildRegister';
import { CollectionTypes } from '../types';
import CardRow from '../../../topologies/Card/CardRow';
import { tableCellTopology } from '../../../topologies/TableCell';

const propTypes = {
  linkedProp: linkType,
};

const defaultCollectionTotalItems = ({ linkedProp }) => (
  <LDLink>
    <Heading size="4">
      <FormattedMessage
        defaultMessage="View all {count}..."
        id="https://app.argu.co/i18n/collection/readAll"
        values={{ count: linkedProp.value }}
      />
    </Heading>
  </LDLink>
);
defaultCollectionTotalItems.propTypes = propTypes;

const cardAppendixCollectionTotalItems = ({ linkedProp }) => (
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
cardAppendixCollectionTotalItems.propTypes = propTypes;

const registerTotalItems = buildRegister({
  property: NS.as('totalItems'),
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
