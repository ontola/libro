import { register, useProperty } from 'link-redux';
import React from 'react';

import teamGL from '../../ontology/teamGL';
import { allTopologies } from '../../../../topologies';
import Progress from '../../../Common/components/Progress';
import { tryParseInt } from '../../../Common/lib/numbers';

const TargetProgress = () => {
  const [current] = useProperty(teamGL.current);
  const [target] = useProperty(teamGL.target);
  const maxInt = tryParseInt(target);
  const valueInt = tryParseInt(current);

  if (!maxInt || !valueInt) {
    return null;
  }

  return(
    <Progress
      progressLabel
      height="15px"
      max={maxInt}
      min={0}
      value={valueInt}
    />
  );
};

TargetProgress.type = teamGL.TargetProgress;

TargetProgress.topology = allTopologies;

export default register(TargetProgress);
