import schema from '@ontologies/schema';
import {
  Property,
  register,
  subjectType,
} from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import { pageTopology } from '../../topologies/Page';

const PhasePage = ({ subject }) => (
  <Property label={schema.isPartOf} selectedPhase={subject} />
);

PhasePage.type = argu.Phase;

PhasePage.topology = pageTopology;

PhasePage.propTypes = {
  subject: subjectType,
};

export default register(PhasePage);
