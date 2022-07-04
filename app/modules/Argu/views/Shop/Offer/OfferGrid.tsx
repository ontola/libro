import * as foaf from '@ontologies/foaf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import dbo from '../../../../Common/ontology/dbo';
import CardContent from '../../../../Common/components/Card/CardContent';
import LDLink from '../../../../Common/components/LDLink';
import { LinkTarget } from '../../../../Common/components/Link';
import CardFixed from '../../../../Common/topologies/Card/CardFixed';
import DetailsBar, { DetailsBarVariant } from '../../../../Common/topologies/DetailsBar';
import { gridTopology } from '../../../../Common/topologies/Grid';
import ontola from '../../../../Kernel/ontology/ontola';
import argu from '../../../ontology/argu';

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
