import foaf from '@ontologies/foaf';
import rdfx from '@ontologies/rdf';
import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  AttributeListItem,
  CardContent,
  LinkedDetailDate,
} from '../../components';
import Button from '../../components/Button';
import app from '../../ontology/app';
import argu from '../../ontology/argu';
import dbo from '../../ontology/dbo';
import meeting from '../../ontology/meeting';
import ontola from '../../ontology/ontola';
import rivm from '../../ontology/rivm';
import wdt from '../../ontology/wdt';
import ActionsBar from '../../topologies/ActionsBar';
import AttributeList from '../../topologies/AttributeList';
import CardAppendix from '../../topologies/Card/CardAppendix';
import CardMain from '../../topologies/Card/CardMain';
import CardRow from '../../topologies/Card/CardRow';
import Container from '../../topologies/Container';
import DetailsBar from '../../topologies/DetailsBar';
import { inlineTopology } from '../../topologies/Inline';
import { defaultMenus } from '../common';
import { fullResourceTopology } from '../../topologies/FullResource';

const InterventionTypeFull = ({ partOf }) => (
  <React.Fragment>
    <Container>
      {partOf && <Property label={schema.isPartOf} />}
      <Property label={argu.trashedAt} />
      <CardMain>
        <DetailsBar right={defaultMenus}>
          <Property label={rdfx.type} />
          <LinkedDetailDate />
          <Property label={argu.pinnedAt} />
          <Property label={argu.expiresAt} />
          <Property label={argu.followsCount} />
          <Property label={schema.location} />
          <Property label={argu.grantedGroups} />
        </DetailsBar>
        <CardContent noSpacing>
          <Property label={[schema.name, rdfs.label]} />
          <Property label={[dbo.thumbnail, wdt.ns('P18')]} />
          <Property label={rivm.exampleOf} topology={inlineTopology} />
          <Property label={[schema.text, schema.description, dbo.abstract]} />
          <Property label={foaf.isPrimaryTopicOf} onLoad={() => null} />
          <AttributeList>
            <tr><th>Praktische ervaring</th><th>Aandrager</th></tr>
            <AttributeListItem label={rivm.securityImprovedScore} />
            <AttributeListItem label={rivm.oneOffCostsScore} />
            <AttributeListItem label={rivm.recurringCostsScore} />
          </AttributeList>
        </CardContent>
        <CardRow noBorder>
          <Property label={argu.attachments} onLoad={() => null} />
          <Property label={meeting.attachment} onLoad={() => null} />
        </CardRow>
        <ActionsBar>
          <Property label={ontola.favoriteAction} onLoad={() => null} />
        </ActionsBar>
        <CardAppendix>
          <Property forceRender label={app.omniform} />
        </CardAppendix>
      </CardMain>
      <Property label={ontola.publishAction} onLoad={() => null} />
    </Container>
    <Container>
      <Property forceRender renderWhenEmpty label={rivm.interventions} />
    </Container>
    <Container>
      <Property label={schema.comment} />
      <Property label={ontola.createAction}>
        {(createActions) => {
          const newInterventionAction = createActions.find((a) => a.value.endsWith('/interventies/new'));

          return newInterventionAction && (
            <Button href={newInterventionAction}>
              Heb jij dit interventietype toegepast? Deel je ervaring!
            </Button>
          );
        }}
      </Property>
    </Container>
  </React.Fragment>
);

InterventionTypeFull.type = rivm.InterventionType;

InterventionTypeFull.topology = fullResourceTopology;

InterventionTypeFull.propTypes = {
  partOf: PropTypes.bool,
};

export default register(InterventionTypeFull);
