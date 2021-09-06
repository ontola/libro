import { NamedNode, SomeTerm } from '@ontologies/core';
import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import { tryParseInt } from '../../../helpers/numbers';
import useDisplayPercentage from '../../../hooks/useDisplayPercentage';
import argu from '../../../ontology/argu';
import { allTopologies } from '../../../topologies';

export interface VotePercentageProps {
  label?: NamedNode;
  linkedProp: SomeTerm;
}

const VotePercentage: FC<VotePercentageProps> = ({
  label,
  linkedProp,
}) => {
  const [votesConCount] = useProperty(argu.votesConCount);
  const [votesNeutralCount] = useProperty(argu.votesNeutralCount);
  const [votesProCount] = useProperty(argu.votesProCount);

  const sideCount = tryParseInt(linkedProp) ?? 0;
  const voteEventCount = (tryParseInt(votesConCount) ?? 0)
    + (tryParseInt(votesNeutralCount) ?? 0)
    + (tryParseInt(votesProCount) ?? 0);
  const option = label?.value?.split('#')?.pop();
  const [votePercentage, displayPercentage] = useDisplayPercentage(sideCount, voteEventCount);

  return (
    <div
      className={`VoteData__votebar-part VoteData__votebar-part--${option}`}
      style={{ width: `${displayPercentage}%` }}
      title={`${linkedProp.value} (${Math.round(votePercentage)}%)`}
    />
  );
};

VotePercentage.type = [argu.VoteEvent];

VotePercentage.topology = allTopologies;

VotePercentage.property = [
  argu.votesConCount,
  argu.votesNeutralCount,
  argu.votesProCount,
];

export default register(VotePercentage);
