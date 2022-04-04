import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import AttributeListItem from '../../../components/AttributeListItem';
import CardContent from '../../../components/Card/CardContent';
import LDLink from '../../../components/LDLink';
import LinkedDetailDate from '../../../components/LinkedDetailDate';
import argu from '../../../ontology/argu';
import dbo from '../../../ontology/dbo';
import ontola from '../../../ontology/ontola';
import rivm from '../../../ontology/rivm';
import { gridTopology } from '../../../topologies';
import CardFixed from '../../../topologies/Card/CardFixed';
import DetailsBar from '../../../topologies/DetailsBar';
import AttributeList from '../../../topologies/AttributeList';

const InterventionGrid: FC = () => (
  <CardFixed>
    <LDLink>
      <Property label={ontola.coverPhoto} />
      <CardContent noSpacing>
        <Property label={[schema.name, rdfs.label]} />
        <Property label={[schema.text, schema.description, dbo.abstract]} />
        <AttributeList>
          <tr>
            <th>
              Praktische ervaring aandrager
            </th>
            <th>
              Beoordeling
            </th>
          </tr>
          <AttributeListItem
            label={rivm.securityImprovedScore}
            labelFrom={rivm.securityImproved}
          />
          <AttributeListItem
            label={rivm.oneOffCostsScore}
            labelFrom={rivm.oneOffCosts}
          />
          <AttributeListItem
            label={rivm.recurringCostsScore}
            labelFrom={rivm.recurringCosts}
          />
        </AttributeList>
      </CardContent>
    </LDLink>
    <DetailsBar borderBottom={false}>
      <Property
        hideName
        label={schema.creator}
      />
      <LinkedDetailDate />
      <Property label={argu.pinnedAt} />
      <Property
        short
        label={argu.expiresAt}
      />
      <Property label={argu.followsCount} />
      <Property label={argu.motionsCount} />
    </DetailsBar>
  </CardFixed>
);

InterventionGrid.type = rivm.Intervention;

InterventionGrid.topology = gridTopology;

export default register(InterventionGrid);
