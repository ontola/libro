import { linkedPropType, register } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import Progress from '../../../components/Progress';
import { tryParseInt } from '../../../helpers/numbers';
import teamGL from '../../../ontology/teamGL';
import { allTopologies } from '../../../topologies';

const Priority = ({ endSpacing, linkedProp }) => (
  <Progress
    endSpacing={endSpacing}
    max={100}
    min={0}
    value={tryParseInt(linkedProp)}
  />
);

Priority.type = [teamGL.Street, teamGL.PostalCode];

Priority.topology = allTopologies;

Priority.property = [teamGL.priority, teamGL.meanPriority];

Priority.propTypes = {
  endSpacing: PropTypes.bool,
  linkedProp: linkedPropType,
};

export default register(Priority);
