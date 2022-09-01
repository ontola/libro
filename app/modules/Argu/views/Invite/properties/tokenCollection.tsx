import * as schema from '@ontologies/schema';
import { normalizeType } from 'link-lib';
import {
  FC,
  LabelType,
  PropertyProps,
  Resource,
  register,
  useIds,
} from 'link-redux';
import React from 'react';

import Collection from '../../../../Collection/components';
import { cardMainTopology } from '../../../../Common/topologies';
import ontola from '../../../../Kernel/ontology/ontola';
import argu from '../../../ontology/argu';

interface TokenCollection extends PropertyProps {
  label?: LabelType;
}

const TokenCollection: FC<TokenCollection> = ({ label: labels }) => {
  const [partOf] = useIds(schema.isPartOf);
  const [group] = useIds(argu.group);
  const filters = React.useMemo(() => ({
    [ontola.redirectUrl.value]: partOf.value,
  }), []);
  const [label] = normalizeType(labels);

  if (!label) {
    return null;
  }

  return (
    <Resource subject={group}>
      <Collection
        hideCreateButton
        hideHeader
        filter={filters}
        label={label}
      />
    </Resource>
  );
};

TokenCollection.type = argu.Invite;

TokenCollection.topology = cardMainTopology;

TokenCollection.property = [
  argu.bearerTokenCollection,
  argu.emailTokenCollection,
];

export default register(TokenCollection);
