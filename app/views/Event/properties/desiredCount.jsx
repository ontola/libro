import { linkedPropType, register } from 'link-redux';
import React from 'react';

import Progress from '../../../components/Progress';
import { tryParseInt } from '../../../helpers/numbers';
import teamGL from '../../../ontology/teamGL';
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

  return (
    <React.Fragment>
      {`${current}/${desired} deelnemers`}
      <Progress max={desired} min={0} value={current} />
    </React.Fragment>
  );
};

DesiredCount.type = [teamGL.Event];

DesiredCount.topology = allTopologies;

DesiredCount.property = teamGL.desiredCount;

DesiredCount.mapDataToProps = {
  participantsCount: teamGL.participantsCount,
};

DesiredCount.propTypes = {
  linkedProp: linkedPropType.isRequired,
  participantsCount: linkedPropType.isRequired,
};

export default register(DesiredCount);
