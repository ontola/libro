import * as rdfx from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  FC,
  Property,
  Resource,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';
import { useLocation } from 'react-router';

import CardContent from '../../components/Card/CardContent';
import CardDivider from '../../components/Card/CardDivider';
import LinkedDetailDate from '../../components/LinkedDetailDate';
import { Size } from '../../components/shared/config';
import usePhases from '../../hooks/usePhases';
import argu from '../../ontology/argu';
import dbo from '../../ontology/dbo';
import meeting from '../../ontology/meeting';
import ontola from '../../ontology/ontola';
import wdt from '../../ontology/wdt';
import CardMain from '../../topologies/Card/CardMain';
import CardRow from '../../topologies/Card/CardRow';
import Container from '../../topologies/Container';
import DetailsBar from '../../topologies/DetailsBar';
import { fullResourceTopology } from '../../topologies/FullResource';
import Grid from '../../topologies/Grid';

interface ProjectFullProps {
  currentPhase: SomeNode;
  phases: SomeNode;
  renderPartOf: boolean;
}

const ProjectFull: FC<ProjectFullProps> = ({
  renderPartOf,
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
        {renderPartOf && <Property label={schema.isPartOf} />}
        <Property label={argu.trashedAt} />
        <Property
          label={ontola.publishAction}
          onLoad={() => null}
        />
        <CardMain>
          <DetailsBar
            right={(
              <React.Fragment>
                <Property label={ontola.followMenu} />
                <Property label={ontola.shareMenu} />
                <Property label={ontola.actionsMenu} />
              </React.Fragment>
            )}
          >
            <Property label={schema.creator} />
            <Property label={rdfx.type} />
            <LinkedDetailDate />
            <Property label={argu.pinnedAt} />
            <Property label={argu.expiresAt} />
            <Property label={argu.followsCount} />
            <Property label={argu.motionsCount} />
            <Property label={schema.location} />
            <Property label={argu.grantedGroups} />
          </DetailsBar>
          <CardContent noSpacing>
            <Property label={[schema.name, rdfs.label]} />
            <Property label={[dbo.thumbnail, wdt.ns('P18')]} />
            <Property label={[schema.text, schema.description, dbo.abstract]} />
          </CardContent>
          <CardRow>
            <Property
              label={argu.attachments}
              onLoad={() => null}
            />
            <Property
              label={meeting.attachment}
              onLoad={() => null}
            />
          </CardRow>
          <Property
            label={argu.voteableVoteEvent}
            onLoad={() => null}
          />
          <CardRow backdrop>
            <Property
              forceRender
              label={argu.phases}
              selectedPhase={renderPhase}
            />
            <CardDivider />
            {renderPhase && <Resource subject={renderPhase} />}
          </CardRow>
        </CardMain>
      </Container>
      {renderPhase && (
        <Resource subject={renderPhase}>
          <Container
            disableGutters
            size={Size.Large}
          >
            <Grid
              container
              spacing={6}
            >
              <Property label={ontola.widgets} />
            </Grid>
          </Container>
        </Resource>
      )}
    </React.Fragment>
  );
};

ProjectFull.type = argu.Project;

ProjectFull.topology = fullResourceTopology;

export default register(ProjectFull);
