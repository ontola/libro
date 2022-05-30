import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useGlobalIds,
  useLRS,
} from 'link-redux';
import React from 'react';
import { useNavigate } from 'react-router';

import LinkLoader from '../../components/Loading/LinkLoader';
import { entityIsLoaded } from '../../helpers/data';
import retrievePath from '../../helpers/iris';
import usePhases, { phaseIRI } from '../../hooks/usePhases';
import argu from '../../ontology/argu';
import { pageTopology } from '../../topologies';

const PhasePage: FC = ({ subject }) => {
  const lrs = useLRS();
  const [isPartOf] = useGlobalIds(schema.isPartOf);
  const [phases, loading] = usePhases(isPartOf);
  const navigate = useNavigate();

  if (loading || (__CLIENT__ && !entityIsLoaded(lrs, isPartOf))) {
    return <LinkLoader />;
  }

  const index = phases.indexOf(subject);
  const location = phaseIRI(isPartOf, index);

  React.useEffect(() => {
    navigate(retrievePath(location)!, { replace: true });
  }, [location]);

  return null;
};

PhasePage.type = argu.Phase;

PhasePage.topology = pageTopology;

export default register(PhasePage);
