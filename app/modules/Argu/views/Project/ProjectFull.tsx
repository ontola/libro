import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  Resource,
  dig,
  register,
  useDataFetching,
  useIds,
  useLRS,
  useStrings,
} from 'link-redux';
import * as rdfx from '@ontologies/rdf';
import React from 'react';
import { useLocation } from 'react-router';

import meeting from '../../../../ontology/meeting';
import AllWithProperty from '../../../Common/components/AllWithProperty';
import CardDivider from '../../../Common/components/Card/CardDivider';
import { PageHeader } from '../../../Common/components/PageHeader';
import SubSection from '../../../Common/components/SubSection';
import { NAME_PREDICATES, TEXT_PREDICATES } from '../../../Common/lib/metaData';
import { fullResourceTopology } from '../../../Common/topologies/FullResource';
import MainBody from '../../../Common/topologies/MainBody';
import { LoadingHidden } from '../../../Core/components/Loading';
import ontola from '../../../Core/ontology/ontola';
import usePhases from '../../hooks/usePhases';
import argu from '../../lib/argu';

const ProjectFull: FC = ({
  subject,
}) => {
  const lrs = useLRS();
  const location = useLocation();

  const [currentPhase] = useIds(argu.currentPhase);
  const [phases] = usePhases(subject);

  const phaseIndex = parseInt(location.hash.replace('#', ''));
  const selectedPhase = phaseIndex ? phases[phaseIndex - 1] : null;
  const renderPhase = selectedPhase ?? currentPhase ?? phases[0];
  const [phaseTitle] = useStrings(renderPhase, NAME_PREDICATES);
  const [phaseResourceTitle] = useStrings(renderPhase, dig(argu.resource, NAME_PREDICATES));

  const [phaseResource] = useIds(renderPhase, argu.resource);
  const timestamp = useDataFetching(phaseResource);
  const resourceForbidden = React.useMemo(() => (
    lrs.getResourceProperty(phaseResource, rdfx.type) === ontola.ns('errors/ForbiddenError')
  ), [timestamp]);

  return (
    <React.Fragment>
      <MainBody>
        <Property label={argu.trashedAt} />
        <Property
          label={ontola.publishAction}
          onLoad={LoadingHidden}
        />
        <PageHeader />
        <Property label={TEXT_PREDICATES} />
        <Property
          label={[argu.attachments, meeting.attachment]}
          onLoad={LoadingHidden}
        />
        <Property label={schema.location} />
        <CardDivider />
        <Property
          forceRender
          label={argu.phases}
          selectedPhase={renderPhase}
        />
        {!resourceForbidden && (
          <Resource
            subject={renderPhase}
            onLoad={LoadingHidden}
          >
            <Property
              label={argu.resource}
              onLoad={LoadingHidden}
            >
              <Property
                label={ontola.publishAction}
                onLoad={LoadingHidden}
              />
              {phaseTitle !== phaseResourceTitle && (
                <Property
                  label={NAME_PREDICATES}
                  onLoad={LoadingHidden}
                />
              )}
              <Property
                label={schema.text}
                onLoad={LoadingHidden}
              />
              <AllWithProperty label={[argu.attachments, meeting.attachment]} />
            </Property>
          </Resource>
        )}
      </MainBody>
      {renderPhase && (
        <Resource
          subject={renderPhase}
          onLoad={LoadingHidden}
        >
          <Property
            label={argu.resource}
            onError={LoadingHidden}
            onLoad={LoadingHidden}
          >
            <SubSection redirect={false} />
          </Property>
        </Resource>
      )}
    </React.Fragment>
  );
};

ProjectFull.type = argu.Project;

ProjectFull.topology = fullResourceTopology;

export default register(ProjectFull);
