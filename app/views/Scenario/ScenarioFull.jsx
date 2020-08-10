import foaf from '@ontologies/foaf';
import rdfx from '@ontologies/rdf';
import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';
import PropTypes from 'prop-types';

import CardContent from '../../components/Card/CardContent';
import app from '../../ontology/app';
import argu from '../../ontology/argu';
import dbo from '../../ontology/dbo';
import meeting from '../../ontology/meeting';
import ontola from '../../ontology/ontola';
import rivm from '../../ontology/rivm';
import wdt from '../../ontology/wdt';
import ActionsBar from '../../topologies/ActionsBar';
import CardAppendix from '../../topologies/Card/CardAppendix';
import CardMain from '../../topologies/Card/CardMain';
import CardRow from '../../topologies/Card/CardRow';
import Container from '../../topologies/Container';
import DetailsBar from '../../topologies/DetailsBar';
import { defaultMenus } from '../common';
import { fullResourceTopology } from '../../topologies/FullResource';

const ScenarioFull = ({ renderPartOf }) => (
  <React.Fragment>
    <Container>
      {renderPartOf && <Property label={schema.isPartOf} />}
      <Property label={argu.trashedAt} />
      <Property label={ontola.publishAction} onLoad={() => null} />
      <CardMain data-test="Thing-thing">
        <Property label={schema.superEvent} />
        <DetailsBar right={defaultMenus}>
          <Property label={rdfx.type} />
          <Property label={argu.grantedGroups} />
        </DetailsBar>
        <CardContent noSpacing>
          <Property label={[schema.name, rdfs.label]} />
          <Property label={[dbo.thumbnail, wdt.ns('P18')]} />
          <Property label={[schema.text, schema.description, dbo.abstract]} />
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
      <Property label={argu.voteEvents} onLoad={() => null} />
      <Property label={argu.blogPosts} onLoad={() => null} />
      <Property label={schema.location} onLoad={() => null} />
      <Property label={argu.motions} onLoad={() => null} />
    </Container>
    <Container size="large">
      <Property forceRender label={argu.arguments} />
    </Container>
    <Container>
      <Property label={schema.comment} />
    </Container>
  </React.Fragment>
);

ScenarioFull.type = rivm.Scenario;

ScenarioFull.topology = fullResourceTopology;

ScenarioFull.propTypes = {
  renderPartOf: PropTypes.bool,
};

export default register(ScenarioFull);
