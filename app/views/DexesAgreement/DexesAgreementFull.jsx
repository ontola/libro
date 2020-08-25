import foaf from '@ontologies/foaf';
import rdfx from '@ontologies/rdf';
import schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import LinkedDetailDate from '../../components/LinkedDetailDate';
import dexes from '../../ontology/dexes';
import CardMain from '../../topologies/Card/CardMain';
import Container from '../../topologies/Container';
import DetailsBar from '../../topologies/DetailsBar';
import { fullResourceTopology } from '../../topologies/FullResource';
import { inlineTopology } from '../../topologies/Inline';
import { defaultMenus } from '../common';

const DexesAgreeMentFull = () => (
  <React.Fragment>
    <Container>
      <CardMain>
        <DetailsBar right={defaultMenus}>
          <Property label={schema.creator} />
          <Property label={rdfx.type} />
          <LinkedDetailDate />
        </DetailsBar>
        <CardContent noSpacing>
          <Property label={schema.email} />
          <Property label={dexes.offer}>
            <Property label={dexes.file}>
              <Property label={schema.name} />
            </Property>
          </Property>
          <Property label={dexes.assigner}>
            <strong>Deler:</strong>
            <Property label={foaf.name} topology={inlineTopology} />
          </Property>
          <Property label={dexes.assignee}>
            <strong>Gedeeld met:</strong>
            <Property label={foaf.name} topology={inlineTopology} />
          </Property>
          <strong>Datum van overeenkomst:</strong>
          <Property label={dexes.dateSigned} />
        </CardContent>
      </CardMain>
    </Container>
  </React.Fragment>
);

DexesAgreeMentFull.type = dexes.Agreement;

DexesAgreeMentFull.topology = fullResourceTopology;

export default register(DexesAgreeMentFull);
