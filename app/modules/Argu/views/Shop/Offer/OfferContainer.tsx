import * as foaf from '@ontologies/foaf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import dbo from '../../../../../ontology/dbo';
import meeting from '../../../../../ontology/meeting';
import CardContent from '../../../../Common/components/Card/CardContent';
import CardHeader from '../../../../Common/components/Card/CardHeader';
import Card from '../../../../Common/topologies/Card';
import CardRow from '../../../../Common/topologies/Card/CardRow';
import { containerTopology } from '../../../../Common/topologies/Container';
import DetailsBar, { DetailsBarVariant } from '../../../../Common/topologies/DetailsBar';
import { alertDialogTopology } from '../../../../Common/topologies/Dialog';
import { fullResourceTopology } from '../../../../Common/topologies/FullResource';
import ontola from '../../../../Core/ontology/ontola';
import argu from '../../../lib/argu';

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
