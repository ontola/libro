import * as foaf from '@ontologies/foaf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useStrings,
} from 'link-redux';
import React from 'react';

import argu from '../../../Argu/ontology/argu';
import dbo from '../../../../ontology/dbo';
import ontola from '../../../../ontology/ontola';
import { gridTopology } from '../../../../topologies';
import CardFixed from '../../../../topologies/Card/CardFixed';
import DetailsBar from '../../../../topologies/DetailsBar';
import CardContent from '../../components/Card/CardContent';
import HeadingContext from '../../components/Heading/HeadingContext';
import LDLink from '../../components/LDLink';

const ThingGrid: FC = () => {
  const [name] = useStrings([schema.name, rdfs.label, foaf.name]);

  return (
    <CardFixed>
      <HeadingContext>
        <LDLink aria-label={name}>
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
      </HeadingContext>
    </CardFixed>
  );
};

ThingGrid.type = schema.Thing;

ThingGrid.topology = gridTopology;

export default register(ThingGrid);
