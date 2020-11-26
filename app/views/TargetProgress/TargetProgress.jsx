import {
  linkType,
  register,
} from 'link-redux';
import React from 'react';

import Progress from '../../components/Progress';
import teamGL from '../../ontology/teamGL';
import { allTopologies } from '../../topologies';

const TargetProgress = ({
  current,
  target,
}) => (
  <Progress
    progressLabel
    height="15px"
    max={target.value}
    min={0}
    value={current.value}
  />
);

TargetProgress.type = teamGL.TargetProgress;

TargetProgress.topology = allTopologies;

TargetProgress.mapDataToProps = {
  current: teamGL.current,
  target: teamGL.target,
};

TargetProgress.propTypes = {
  current: linkType,
  target: linkType,
};

export default register(TargetProgress);
