import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  Resource,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';
import { useLocation } from 'react-router';

import CardDivider from '../../components/Card/CardDivider';
import { PageHeader } from '../../components/PageHeader';
import { Size } from '../../components/shared/config';
import SubSection from '../../components/SubSection';
import usePhases from '../../hooks/usePhases';
import argu from '../../ontology/argu';
import dbo from '../../ontology/dbo';
import meeting from '../../ontology/meeting';
import ontola from '../../ontology/ontola';
import wdt from '../../ontology/wdt';
import Container from '../../topologies/Container';
import { fullResourceTopology } from '../../topologies/FullResource';
import Grid from '../../topologies/Grid';
import List from '../../topologies/List';
import MainBody from '../../topologies/MainBody';

const ProjectFull: FC = ({
  subject,
}) => {
  const location = useLocation();

  const [currentPhase] = useProperty(argu.currentPhase);
  const [phases] = usePhases(subject);

  const phaseIndex = parseInt(location.hash.replace('#', ''));
  const selectedPhase = phaseIndex ? phases[phaseIndex - 1] : null;
  const renderPhase = selectedPhase ?? currentPhase ?? phases[0];

  return (
    <React.Fragment>
      <Container>
        <Property label={argu.trashedAt} />
        <Property
          label={ontola.publishAction}
          onLoad={() => null}
        />
        <PageHeader />
        <MainBody>
          <Property label={[dbo.thumbnail, wdt.ns('P18')]} />
          <Property label={[schema.text, schema.description, dbo.abstract]} />
          <List>
            <Property
              label={argu.attachments}
              onLoad={() => null}
            />
            <Property
              label={meeting.attachment}
              onLoad={() => null}
            />
          </List>
          <Property
            label={argu.voteableVoteEvent}
            onLoad={() => null}
          />
          <CardDivider />
          <Property
            forceRender
            label={argu.phases}
            selectedPhase={renderPhase}
          />
          {renderPhase && <Resource subject={renderPhase} />}
        </MainBody>
      </Container>
      {renderPhase && (
        <SubSection>
          <Container
            disableGutters
            size={Size.Large}
          >
            <Resource subject={renderPhase}>
              <Grid
                container
                spacing={6}
              >
                <Property label={ontola.widgets} />
              </Grid>
            </Resource>
          </Container>
        </SubSection>
      )}
    </React.Fragment>
  );
};

ProjectFull.type = argu.Project;

ProjectFull.topology = fullResourceTopology;

export default register(ProjectFull);
