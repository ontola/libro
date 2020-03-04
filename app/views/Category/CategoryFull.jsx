import rdfx from '@ontologies/rdf';
import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import dbo from '../../ontology/dbo';
import rivm from '../../ontology/rivm';
import CardMain from '../../topologies/Card/CardMain';
import Container from '../../topologies/Container';
import DetailsBar from '../../topologies/DetailsBar';
import { fullResourceTopology } from '../../topologies/FullResource';
import { defaultMenus } from '../common';

const CategoryFull = () => (
  <Container>
    <CardMain>
      <DetailsBar right={defaultMenus}>
        <Property label={rdfx.type} />
      </DetailsBar>
      <CardContent noSpacing>
        <Property label={[schema.name, rdfs.label]} />
        <Property label={[schema.text, schema.description, dbo.abstract]} />
      </CardContent>
    </CardMain>
    <Property renderWhenEmpty label={rivm.measureTypes} />
  </Container>
);

CategoryFull.type = rivm.Category;

CategoryFull.topology = fullResourceTopology;

export default register(CategoryFull);
