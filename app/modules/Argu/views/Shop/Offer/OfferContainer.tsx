import * as foaf from '@ontologies/foaf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import argu from '../../../ontology/argu';
import dbo from '../../../../../ontology/dbo';
import meeting from '../../../../../ontology/meeting';
import ontola from '../../../../../ontology/ontola';
import {
  alertDialogTopology,
  containerTopology,
  fullResourceTopology,
} from '../../../../../topologies';
import Card from '../../../../../topologies/Card';
import CardRow from '../../../../../topologies/Card/CardRow';
import DetailsBar, { DetailsBarVariant } from '../../../../../topologies/DetailsBar';
import CardContent from '../../../../Common/components/Card/CardContent';
import CardHeader from '../../../../Common/components/Card/CardHeader';

import OfferActionButtons from './OfferActionButtons';

const OfferContainer: FC = () => (
  <Card>
    <Property label={ontola.coverPhoto} />
    <CardContent noSpacing>
      <CardHeader float={<Property label={ontola.destroyAction} />}>
        <Property label={[schema.name, rdfs.label, foaf.name]} />
      </CardHeader>
      <Property label={[schema.text, schema.description, dbo.abstract]} />
    </CardContent>
    <CardRow>
      <Property label={[argu.attachments, meeting.attachment]} />
    </CardRow>
    <DetailsBar
      borderBottom={false}
      right={<OfferActionButtons />}
      variant={DetailsBarVariant.Wide}
    >
      <Property label={argu.price} />
    </DetailsBar>
  </Card>
);

OfferContainer.type = schema.Offer;

OfferContainer.topology = [
  alertDialogTopology,
  fullResourceTopology,
  containerTopology,
];

export default register(OfferContainer);
