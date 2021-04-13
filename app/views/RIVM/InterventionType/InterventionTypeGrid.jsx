import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import AttributeListItem from '../../../components/AttributeListItem';
import CardContent from '../../../components/Card/CardContent';
import LDLink from '../../../components/LDLink';
import dbo from '../../../ontology/dbo';
import CardFixed from '../../../topologies/Card/CardFixed';
import rivm from '../../../ontology/rivm';
import DetailsBar from '../../../topologies/DetailsBar';
import AttributeList from '../../../topologies/AttributeList';
import { gridTopology } from '../../../topologies/Grid';

const InterventionTypeGrid = () => (
  <CardFixed>
    <LDLink>
      <CardContent noSpacing>
        <Property label={[schema.name, rdfs.label]} />
        <Property label={[schema.text, schema.description, dbo.abstract]} />
        <AttributeList>
          <tr>
            <th>Praktische ervaring aandragers</th>
            <th>Gemiddelde beoordeling</th>
          </tr>
          <AttributeListItem label={rivm.securityImprovedScore} />
          <AttributeListItem label={rivm.oneOffCostsScore} />
          <AttributeListItem label={rivm.recurringCostsScore} />
        </AttributeList>
      </CardContent>
    </LDLink>
    <DetailsBar />
  </CardFixed>
);

InterventionTypeGrid.type = rivm.InterventionType;

InterventionTypeGrid.topology = gridTopology;

export default register(InterventionTypeGrid);
