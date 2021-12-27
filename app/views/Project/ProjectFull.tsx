import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  Resource,
  dig,
  register,
  useIds,
  useStrings,
} from 'link-redux';
import React from 'react';
import { useLocation } from 'react-router';

import CardDivider from '../../components/Card/CardDivider';
import { LoadingHidden } from '../../components/Loading';
import { PageHeader } from '../../components/PageHeader';
import SubSection from '../../components/SubSection';
import { NAME_PREDICATES, TEXT_PREDICATES } from '../../helpers/metaData';
import usePhases from '../../hooks/usePhases';
import argu from '../../ontology/argu';
import meeting from '../../ontology/meeting';
import ontola from '../../ontology/ontola';
import { fullResourceTopology } from '../../topologies/FullResource';
import List from '../../topologies/List';
import MainBody from '../../topologies/MainBody';

const ProjectFull: FC = ({
  subject,
}) => {
  const location = useLocation();

  const [currentPhase] = useIds(argu.currentPhase);
  const [phases] = usePhases(subject);

  const phaseIndex = parseInt(location.hash.replace('#', ''));
  const selectedPhase = phaseIndex ? phases[phaseIndex - 1] : null;
  const renderPhase = selectedPhase ?? currentPhase ?? phases[0];
  const [phaseTitle] = useStrings(renderPhase, NAME_PREDICATES);
  const [phaseResourceTitle] = useStrings(renderPhase, dig(argu.resource, NAME_PREDICATES));

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
        <List>
          <Property
            label={argu.attachments}
            onLoad={LoadingHidden}
          />
        </List>
        <CardDivider />
        <Property
          forceRender
          label={argu.phases}
          selectedPhase={renderPhase}
        />
        <Resource
          subject={renderPhase}
          onLoad={LoadingHidden}
        >
          <Property
            label={argu.resource}
            onError={LoadingHidden}
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
            <Property
              label={[argu.attachments, meeting.attachment]}
              limit={Infinity}
            />
          </Property>
        </Resource>
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
