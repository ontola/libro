import { SomeTerm } from '@ontologies/core';
import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import Detail from '../../../../components/Detail';
import Progress from '../../../../components/Progress';
import { tryParseInt } from '../../../../helpers/numbers';
import teamGL from '../../../../ontology/teamGL';
import { allTopologies } from '../../../../topologies';

interface ParticipantsCountProps {
  linkedProp: SomeTerm;
}

const ParticipantsCount: FC<ParticipantsCountProps> = ({  linkedProp }) => {
  const [desiredCount] = useProperty(teamGL.desiredCount);
  const desired = tryParseInt(desiredCount) || 0;
  const current = tryParseInt(linkedProp) || 0;

  const text = desired === 0
    ? current.toString()
    : (
      <div>
        <Progress
          detail
          max={desired}
          maxWidth="10em"
          min={0}
          value={Math.min(current, desired)}
        />
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

export default register(ParticipantsCount);
