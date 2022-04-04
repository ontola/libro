import * as foaf from '@ontologies/foaf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import CardContent from '../../../components/Card/CardContent';
import LDLink from '../../../components/LDLink';
import { LinkTarget } from '../../../components/Link';
import argu from '../../../ontology/argu';
import dbo from '../../../ontology/dbo';
import ontola from '../../../ontology/ontola';
import { gridTopology } from '../../../topologies';
import CardFixed from '../../../topologies/Card/CardFixed';
import DetailsBar, { DetailsBarVariant } from '../../../topologies/DetailsBar';

import OfferActionButtons from './OfferActionButtons';

const OfferGrid: FC = () => (
  <CardFixed>
    <LDLink target={LinkTarget.Modal}>
      <Property label={ontola.coverPhoto} />
      <CardContent noSpacing>
        <Property label={[schema.name, rdfs.label, foaf.name]} />
        <Property label={[schema.text, schema.description, dbo.abstract]} />
      </CardContent>
    </LDLink>
    <DetailsBar
      borderBottom={false}
      right={<OfferActionButtons />}
      variant={DetailsBarVariant.Wide}
    >
      <Property label={argu.price} />
    </DetailsBar>
  </CardFixed>
);

OfferGrid.type = schema.Offer;

OfferGrid.topology = gridTopology;

export default register(OfferGrid);
