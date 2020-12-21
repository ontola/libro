import rdfx from '@ontologies/rdf';
import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import {
  Property,
  Resource,
  linkType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import CardDivider from '../../components/Card/CardDivider';
import LinkedDetailDate from '../../components/LinkedDetailDate';
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

const ProjectFull = ({
  currentPhase,
  renderPartOf,
  selectedPhase,
}) => {
  const renderPhase = selectedPhase || currentPhase;

  return (
    <React.Fragment>
      <Container>
        {renderPartOf && <Property label={schema.isPartOf} />}
        <Property label={argu.trashedAt} />
        <Property label={ontola.publishAction} onLoad={() => null} />
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
          <CardRow noBorder>
            <Property label={argu.attachments} onLoad={() => null} />
            <Property label={meeting.attachment} onLoad={() => null} />
          </CardRow>
          <Property label={argu.voteableVoteEvent} onLoad={() => null} />
          <CardRow backdrop>
            <Property forceRender label={argu.phases} selectedPhase={renderPhase} />
            <CardDivider />
            {renderPhase && <Resource subject={renderPhase} />}
          </CardRow>
        </CardMain>
      </Container>
      {renderPhase && (
        <Resource subject={renderPhase}>
          <Container disableGutters size="large">
            <Grid container spacing={6}>
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

ProjectFull.mapDataToProps = {
  currentPhase: argu.currentPhase,
  name: schema.name,
};

ProjectFull.propTypes = {
  currentPhase: linkType,
  renderPartOf: PropTypes.bool,
  selectedPhase: linkType,
};

export default register(ProjectFull);
