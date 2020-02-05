import rdfx from '@ontologies/rdf';
import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import {
  Property,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { CardContent, LinkedDetailDate } from '../../components';
import argu from '../../ontology/argu';
import dbo from '../../ontology/dbo';
import ontola from '../../ontology/ontola';
import { fullResourceTopology } from '../../topologies/FullResource';
import ActionsBar from '../../topologies/ActionsBar';
import CardMain from '../../topologies/Card/CardMain';
import Container from '../../topologies/Container';
import DetailsBar from '../../topologies/DetailsBar';

const SurveyFull = ({ partOf }) => (
  <React.Fragment>
    <Container>
      {partOf && <Property label={schema.isPartOf} />}
      <Property label={argu.trashedAt} />
      <Property label={ontola.publishAction} onLoad={() => null} />
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
        <CardContent endSpacing noSpacing>
          <Property label={[schema.name, rdfs.label]} />
          <Property label={[schema.text, schema.description, dbo.abstract]} />
          <ActionsBar>
            <Property label={argu.externalIRI} />
          </ActionsBar>
        </CardContent>
      </CardMain>
    </Container>
  </React.Fragment>
);

SurveyFull.type = [argu.Survey];

SurveyFull.topology = fullResourceTopology;

SurveyFull.propTypes = {
  partOf: PropTypes.bool,
};

export default register(SurveyFull);
