import * as rdfx from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import dbo from '../../../../ontology/dbo';
import { fullResourceTopology, tabPaneTopology } from '../../../../topologies';
import CardMain from '../../../../topologies/Card/CardMain';
import Container from '../../../../topologies/Container';
import DetailsBar from '../../../../topologies/DetailsBar';
import CardContent from '../../../Common/components/Card/CardContent';
import { defaultMenus } from '../../../Common/lib/viewHelpers';

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
