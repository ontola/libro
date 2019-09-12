import { linkedPropType, register } from 'link-redux';
import React from 'react';

import Progress from '../../../components/Progress';
import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologies } from '../../../topologies';

const DesiredCount = ({ linkedProp, participantsCount }) => {
  if (linkedProp.value === 0) {
    return null;
  }

  if (linkedProp.value <= participantsCount.value) {
    return <p>{`Je hebt je doel van ${linkedProp.value} vrijwilligers gehaald!`}</p>;
  }

  return <Progress max={linkedProp.value} min={0} value={participantsCount.value} />;
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
