import * as rdfx from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import argu from '../../ontology/argu';
import dbo from '../../ontology/dbo';
import CardMain from '../../topologies/Card/CardMain';
import Container from '../../topologies/Container';
import DetailsBar from '../../topologies/DetailsBar';
import { fullResourceTopology } from '../../topologies/FullResource';
import { tabPaneTopology } from '../../topologies/TabPane';
import { defaultMenus } from '../common';

const CustomFormFull: FC = () => (
  <React.Fragment>
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
    </Container>
    <Container>
      <Property
        forceRender
        label={argu.customFormFields}
      />
    </Container>
  </React.Fragment>
);

CustomFormFull.type = argu.CustomForm;

CustomFormFull.topology = [
  fullResourceTopology,
  tabPaneTopology,
];

export default register(CustomFormFull);
