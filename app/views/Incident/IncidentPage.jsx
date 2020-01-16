import foaf from '@ontologies/foaf';
import rdfx from '@ontologies/rdf';
import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import { CardContent } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import app from '../../ontology/app';
import argu from '../../ontology/argu';
import meeting from '../../ontology/meeting';
import ontola from '../../ontology/ontola';
import rivm from '../../ontology/rivm';
import ActionsBar from '../../topologies/ActionsBar';
import CardAppendix from '../../topologies/Card/CardAppendix';
import CardMain from '../../topologies/Card/CardMain';
import CardRow from '../../topologies/Card/CardRow';
import Container from '../../topologies/Container';
import DetailsBar from '../../topologies/DetailsBar';
import { pageTopology } from '../../topologies/Page';
import PrimaryResource from '../../topologies/PrimaryResource';

const IncidentPage = () => (
  <PrimaryResource>
    <Property label={ontola.coverPhoto} onLoad={() => null} />
    <Container>
      <Property label={schema.isPartOf} />
      <Property label={argu.trashedAt} />
      <CardMain>
        <Property label={schema.superEvent} />
        <DetailsBar
          right={(
            <React.Fragment>
              <Property label={ontola.followMenu} />
              <Property label={ontola.shareMenu} />
              <Property label={ontola.actionsMenu} />
            </React.Fragment>
          )}
        >
          <Property label={rdfx.type} />
          <Property label={argu.grantedGroups} />
        </DetailsBar>
        <CardContent noSpacing>
          <Property label={[schema.name, rdfs.label]} />
          <Property label={[NS.dbo('thumbnail'), NS.wdt('P18')]} />
          <Property label={[schema.text, schema.description, NS.dbo('abstract')]} />
          <Property label={foaf.isPrimaryTopicOf} onLoad={() => null} />
        </CardContent>
        <CardRow noBorder>
          <Property label={argu.attachments} onLoad={() => null} />
          <Property label={meeting.attachment} onLoad={() => null} />
        </CardRow>
        <ActionsBar>
          <Property label={ontola.favoriteAction} onLoad={() => null} />
        </ActionsBar>
        <Property label={meeting.agenda} onLoad={() => null} />
        <CardAppendix>
          <Property forceRender label={app.omniform} />
        </CardAppendix>
      </CardMain>
      <Property label={ontola.publishAction} onLoad={() => null} />
      <Property label={argu.voteEvents} onLoad={() => null} />
      <Property label={argu.blogPosts} onLoad={() => null} />
      <Property label={schema.location} onLoad={() => null} />
      <Property label={argu.motions} onLoad={() => null} />
    </Container>
    <Container>
      <Property forceRender renderWhenEmpty label={rivm.scenarios} />
    </Container>
    <Container>
      <Property label={schema.comment} />
    </Container>
  </PrimaryResource>
);

IncidentPage.type = rivm.Incident;

IncidentPage.topology = pageTopology;

export default register(IncidentPage);
