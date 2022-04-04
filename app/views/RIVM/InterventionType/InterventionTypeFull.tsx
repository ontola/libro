import { NamedNode } from '@ontologies/core';
import * as foaf from '@ontologies/foaf';
import * as rdfx from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import AttributeListItem from '../../../components/AttributeListItem';
import Button from '../../../components/Button';
import CardContent from '../../../components/Card/CardContent';
import LinkedDetailDate from '../../../components/LinkedDetailDate';
import argu from '../../../ontology/argu';
import dbo from '../../../ontology/dbo';
import meeting from '../../../ontology/meeting';
import ontola from '../../../ontology/ontola';
import rivm from '../../../ontology/rivm';
import wdt from '../../../ontology/wdt';
import { fullResourceTopology, inlineTopology } from '../../../topologies';
import ActionsBar from '../../../topologies/ActionsBar';
import AttributeList from '../../../topologies/AttributeList';
import CardMain from '../../../topologies/Card/CardMain';
import CardRow from '../../../topologies/Card/CardRow';
import Container from '../../../topologies/Container';
import DetailsBar from '../../../topologies/DetailsBar';
import { defaultMenus } from '../../common';
import { LoadingHidden } from '../../../components/Loading';

const InterventionTypeFull: FC = () => (
  <React.Fragment>
    <Container>
      <Property label={argu.trashedAt} />
      <Property
        label={ontola.publishAction}
        onLoad={LoadingHidden}
      />
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
          <Property
            label={rivm.exampleOf}
            topology={inlineTopology}
          />
          <Property label={[schema.text, schema.description, dbo.abstract]} />
          <Property
            label={foaf.isPrimaryTopicOf}
            onLoad={LoadingHidden}
          />
          <AttributeList>
            <tr>
              <th>
                Praktische ervaring aandragers
              </th>
              <th>
                Gemiddelde beoordeling
              </th>
            </tr>
            <AttributeListItem label={rivm.securityImprovedScore} />
            <AttributeListItem label={rivm.oneOffCostsScore} />
            <AttributeListItem label={rivm.recurringCostsScore} />
          </AttributeList>
        </CardContent>
        <CardRow>
          <Property
            label={argu.attachments}
            onLoad={LoadingHidden}
          />
          <Property
            label={meeting.attachment}
            onLoad={LoadingHidden}
          />
        </CardRow>
        <ActionsBar>
          <Property
            label={ontola.favoriteAction}
            onLoad={LoadingHidden}
          />
        </ActionsBar>
      </CardMain>
    </Container>
    <Container>
      <Property
        forceRender
        renderWhenEmpty
        label={rivm.interventions}
      />
      <Property label={ontola.createAction}>
        {(createActions: NamedNode[]) => {
          const newInterventionAction = createActions.find((a) => a.value.endsWith('/interventies/new'));

          return newInterventionAction && (
            <Button href={newInterventionAction.value}>
              Heb jij dit interventietype toegepast? Deel jouw interventie hier!
            </Button>
          );
        }}
      </Property>
    </Container>
    <Container>
      <Property
        forceRender
        renderWhenEmpty
        label={schema.comment}
      />
    </Container>
  </React.Fragment>
);

InterventionTypeFull.type = rivm.InterventionType;

InterventionTypeFull.topology = fullResourceTopology;

export default register(InterventionTypeFull);
