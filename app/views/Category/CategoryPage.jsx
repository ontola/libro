import rdfx from '@ontologies/rdf';
import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import { CardContent } from '../../components';
import dbo from '../../ontology/dbo';
import rivm from '../../ontology/rivm';
import CardMain from '../../topologies/Card/CardMain';
import Container from '../../topologies/Container';
import DetailsBar from '../../topologies/DetailsBar';
import { pageTopology } from '../../topologies/Page';
import PrimaryResource from '../../topologies/PrimaryResource';
import { defaultMenus } from '../common';

const CategoryPage = () => (
  <PrimaryResource>
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
  </PrimaryResource>
);

CategoryPage.type = rivm.Category;

CategoryPage.topology = pageTopology;

export default register(CategoryPage);
