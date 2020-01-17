import {
  labelType,
  linkType,
  register,
} from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { tryParseInt } from '../../../helpers/numbers';
import argu from '../../../ontology/argu';
import { allTopologies } from '../../../topologies';

const HUNDRED_PERCENT = 100;
const LOWER_LIMIT = 5;
const THREE_SIDE_STALEMATE = 33;

const VotePercentage = ({
  label,
  linkedProp,
  votesConCount,
  votesNeutralCount,
  votesProCount,
}) => {
  const sideCount = tryParseInt(linkedProp);
  const voteEventCount = tryParseInt(votesConCount)
    + tryParseInt(votesNeutralCount)
    + tryParseInt(votesProCount);
  const option = label.value.split('#').pop();

  const percentages = () => {
    if (voteEventCount === 0) {
      return [0, THREE_SIDE_STALEMATE];
    }

    const votePercentage = (sideCount / voteEventCount) * HUNDRED_PERCENT;
    const displayPercentage = votePercentage < LOWER_LIMIT ? LOWER_LIMIT : votePercentage;

    return [votePercentage, displayPercentage];
  };

  const [votePercentage, displayPercentage] = percentages();

  return (
    <div
      className={`VoteData__votebar-part VoteData__votebar-part--${option}`}
      style={{ width: `${displayPercentage}%` }}
      title={`${linkedProp.value} (${Math.round(votePercentage)}%)`}
    />
  );
};

VotePercentage.type = [argu.VoteEvent, NS.aod('VoteEvent')];

VotePercentage.topology = allTopologies;

VotePercentage.property = [
  argu.votesConCount,
  argu.votesNeutralCount,
  argu.votesProCount,
];

VotePercentage.mapDataToProps = {
  votesConCount: argu.votesConCount,
  votesNeutralCount: argu.votesNeutralCount,
  votesProCount: argu.votesProCount,
};

VotePercentage.propTypes = {
  label: labelType,
  linkedProp: linkType,
  votesConCount: linkType,
  votesNeutralCount: linkType,
  votesProCount: linkType,
};

export default register(VotePercentage);
