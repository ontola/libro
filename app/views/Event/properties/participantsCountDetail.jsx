import { linkedPropType, register } from 'link-redux';
import React from 'react';

import Detail from '../../../components/Detail';
import Progress from '../../../components/Progress';
import { tryParseInt } from '../../../helpers/numbers';
import teamGL from '../../../ontology/teamGL';
import { allTopologies } from '../../../topologies';

const ParticipantsCount = ({ desiredCount, linkedProp }) => {
  const desired = tryParseInt(desiredCount) || 0;
  const current = tryParseInt(linkedProp);

  const text = desired === 0
    ? current.toString()
    : (
      <div>
        <Progress detail max={desired} maxWidth="10em" min={0} value={Math.min(current, desired)} />
        {` ${current}/${desired}`}
      </div>
    );

  return (
    <Detail
      icon="users"
      text={text}
      title="Deelnemers"
    />
  );
};

ParticipantsCount.type = [teamGL.Event];

ParticipantsCount.topology = allTopologies;

ParticipantsCount.property = teamGL.participantsCount;

ParticipantsCount.mapDataToProps = {
  desiredCount: teamGL.desiredCount,
};

ParticipantsCount.propTypes = {
  desiredCount: linkedPropType.isRequired,
  linkedProp: linkedPropType.isRequired,
};

export default register(ParticipantsCount);
