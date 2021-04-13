import { NamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useLRS,
} from 'link-redux';
import React from 'react';
import { Redirect } from 'react-router';

import LinkLoader from '../../components/Loading/LinkLoader';
import { entityIsLoaded } from '../../helpers/data';
import retrievePath from '../../helpers/iris';
import usePhases, { phaseIRI } from '../../hooks/usePhases';
import argu from '../../ontology/argu';
import { pageTopology } from '../../topologies/Page';

export interface PhasePageProps {
  isPartOf: NamedNode;
}

const PhasePage: FC<PhasePageProps> = ({
  isPartOf,
  subject,
}) => {
  const lrs = useLRS();
  const [phases, loaded] = usePhases(isPartOf);

  if (!loaded || __CLIENT__ && !entityIsLoaded(lrs, isPartOf)) {
    return <LinkLoader />;
  }

  const index = phases.indexOf(subject);
  const location = phaseIRI(isPartOf, index);

  return <Redirect to={retrievePath(location)!} />;
};

PhasePage.type = argu.Phase;

PhasePage.topology = pageTopology;

PhasePage.mapDataToProps = {
  isPartOf: schema.isPartOf,
};

export default register(PhasePage);