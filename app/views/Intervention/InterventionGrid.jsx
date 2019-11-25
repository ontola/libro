import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import CardFixed from '../../topologies/Card/CardFixed';
import {
  AttributeListItem,
  CardContent,
  LDLink,
  LinkedDetailDate,
} from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import DetailsBar from '../../topologies/DetailsBar';
import AttributeList from '../../topologies/AttributeList';
import { gridTopology } from '../../topologies/Grid';

const InterventionGrid = () => (
  <CardFixed>
    <LDLink>
      <Property label={NS.ontola('coverPhoto')} />
      <CardContent noSpacing>
        <Property label={[schema.name, rdfs.label]} />
        <Property label={[schema.text, schema.description, NS.dbo('abstract')]} />
        <AttributeList>
          <tr><th>Praktische ervaring</th><th>Aandrager</th></tr>
          <AttributeListItem label={NS.rivm('securityImprovedScore')} />
          <AttributeListItem label={NS.rivm('oneOffCostsScore')} />
          <AttributeListItem label={NS.rivm('recurringCostsScore')} />
        </AttributeList>
      </CardContent>
    </LDLink>
    <DetailsBar>
      <Property hideName label={schema.creator} />
      <LinkedDetailDate />
      <Property label={NS.argu('pinnedAt')} />
      <Property short label={NS.argu('expiresAt')} />
      <Property label={NS.argu('followsCount')} />
      <Property label={NS.argu('motionsCount')} />
    </DetailsBar>
  </CardFixed>
);

InterventionGrid.type = NS.rivm('Intervention');

InterventionGrid.topology = gridTopology;

export default register(InterventionGrid);
