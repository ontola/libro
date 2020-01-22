import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import dbo from '../../ontology/dbo';
import CardFixed from '../../topologies/Card/CardFixed';
import {
  AttributeListItem,
  CardContent,
  LDLink,
  LinkedDetailDate,
} from '../../components';
import rivm from '../../ontology/rivm';
import DetailsBar from '../../topologies/DetailsBar';
import AttributeList from '../../topologies/AttributeList';
import { gridTopology } from '../../topologies/Grid';

const InterventionTypeGrid = () => (
  <CardFixed>
    <LDLink>
      <CardContent noSpacing>
        <Property label={[schema.name, rdfs.label]} />
        <Property label={[schema.text, schema.description, dbo.abstract]} />
        <AttributeList>
          <tr><th>Praktische ervaring</th><th>Aandrager</th></tr>
          <AttributeListItem label={rivm.securityImprovedScore} />
          <AttributeListItem label={rivm.oneOffCostsScore} />
          <AttributeListItem label={rivm.recurringCostsScore} />
        </AttributeList>
      </CardContent>
    </LDLink>
    <DetailsBar>
      <LinkedDetailDate />
    </DetailsBar>
  </CardFixed>
);

InterventionTypeGrid.type = rivm.InterventionType;

InterventionTypeGrid.topology = gridTopology;

export default register(InterventionTypeGrid);
