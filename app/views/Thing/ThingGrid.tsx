import * as foaf from '@ontologies/foaf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import LDLink from '../../components/LDLink';
import argu from '../../ontology/argu';
import dbo from '../../ontology/dbo';
import ontola from '../../ontology/ontola';
import CardFixed from '../../topologies/Card/CardFixed';
import DetailsBar from '../../topologies/DetailsBar';
import { gridTopology } from '../../topologies/Grid';

const ThingGrid: FC = () => {
  const [name] = useProperty([schema.name, rdfs.label, foaf.name]);

  return (
    <CardFixed>
      <LDLink aria-label={name.value}>
        <Property label={ontola.coverPhoto} />
        <CardContent noSpacing>
          <Property label={[schema.name, rdfs.label, foaf.name]} />
          <Property label={[schema.text, schema.description, dbo.abstract]} />
        </CardContent>
      </LDLink>
      <DetailsBar borderBottom={false}>
        <Property
          hideName
          label={schema.creator}
        />
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
};

ThingGrid.type = schema.Thing;

ThingGrid.topology = gridTopology;

export default register(ThingGrid);
