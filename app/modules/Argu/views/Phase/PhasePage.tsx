import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useGlobalIds,
  useLRS, 
} from 'link-redux';
import React from 'react';
import { useNavigate } from 'react-router';

import retrievePath from '../../../Common/lib/iris';
import { pageTopology } from '../../../Common/topologies/Page';
import LinkLoader from '../../../Core/components/Loading/LinkLoader';
import { entityIsLoaded } from '../../../Core/lib/data';
import usePhases, { phaseIRI } from '../../hooks/usePhases';
import argu from '../../lib/argu';

const PhasePage: FC = ({ subject }) => {
  const lrs = useLRS();
  const [isPartOf] = useGlobalIds(schema.isPartOf);
  const [phases, loadingPhases] = usePhases(isPartOf);
  const navigate = useNavigate();

  const index = phases.indexOf(subject);
  const location = phaseIRI(isPartOf, index);
  const loading = loadingPhases || (__CLIENT__ && !entityIsLoaded(lrs, isPartOf));

  React.useEffect(() => {
    if (!loading) {
      navigate(retrievePath(location)!, { replace: true });
    }
  }, [loading, location]);

  if (loading) {
    return <LinkLoader />;
  }

  return null;
};

PhasePage.type = argu.Phase;

PhasePage.topology = pageTopology;

export default register(PhasePage);
