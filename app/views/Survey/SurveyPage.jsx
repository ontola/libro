import rdfx from '@ontologies/rdf';
import schema from '@ontologies/schema';
import {
  Property,
  register,
} from 'link-redux';
import React from 'react';
import rdfs from '@ontologies/rdfs';

import { CardContent, LinkedDetailDate } from '../../components';
import argu from '../../ontology/argu';
import dbo from '../../ontology/dbo';
import ontola from '../../ontology/ontola';
import { pageTopology } from '../../topologies/Page';
import PrimaryResource, { primaryResourceTopology } from '../../topologies/PrimaryResource';
import ActionsBar from '../../topologies/ActionsBar';
import CardMain from '../../topologies/Card/CardMain';
import Container from '../../topologies/Container';
import DetailsBar from '../../topologies/DetailsBar';

const SurveyPage = () => (
  <PrimaryResource>
    <Property label={ontola.coverPhoto} />
    <Container>
      <Property label={schema.isPartOf} />
      <Property label={argu.trashedAt} />
      <CardMain data-test="Thing-thing">
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
          <Property label={[schema.text, schema.description, dbo.abstract]} />
        </CardContent>
        <ActionsBar>
          <Property label={argu.externalIRI} />
        </ActionsBar>
      </CardMain>
    </Container>
  </PrimaryResource>
);

SurveyPage.type = [argu.Survey];

SurveyPage.topology = [
  primaryResourceTopology,
  pageTopology,
];

export default register(SurveyPage);
