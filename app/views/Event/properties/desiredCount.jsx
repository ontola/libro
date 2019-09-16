import { linkedPropType, register } from 'link-redux';
import React from 'react';

import Progress from '../../../components/Progress';
import { NS } from '../../../helpers/LinkedRenderStore';
import { tryParseInt } from '../../../helpers/numbers';
import { allTopologies } from '../../../topologies';

const DesiredCount = ({ linkedProp, participantsCount }) => {
  const desired = tryParseInt(linkedProp.value);
  const current = tryParseInt(participantsCount.value);

  if (desired === 0) {
    return null;
  }

  if (desired <= current) {
    return <p>{`Je hebt je doel van ${desired} vrijwilligers gehaald!`}</p>;
  }

  return <Progress max={desired} min={0} value={current} />;
};

DesiredCount.type = [NS.teamGL('Event')];

DesiredCount.topology = allTopologies;

DesiredCount.property = NS.teamGL('desiredCount');

DesiredCount.mapDataToProps = [
  NS.teamGL('participantsCount'),
];

DesiredCount.propTypes = {
  linkedProp: linkedPropType.isRequired,
  participantsCount: linkedPropType.isRequired,
};

export default register(DesiredCount);
