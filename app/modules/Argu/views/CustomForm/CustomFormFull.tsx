import * as rdfx from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import dbo from '../../../Common/ontology/dbo';
import CardContent from '../../../Common/components/Card/CardContent';
import { defaultMenus } from '../../../Common/lib/viewHelpers';
import { fullResourceTopology, tabPaneTopology } from '../../../Common/topologies';
import CardMain from '../../../Common/topologies/Card/CardMain';
import Container from '../../../Common/topologies/Container';
import DetailsBar from '../../../Common/topologies/DetailsBar';
import argu from '../../ontology/argu';

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
