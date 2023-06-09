import * as foaf from '@ontologies/foaf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import HeadingContext from '../../../../Common/components/Heading/HeadingContext';
import dbo from '../../../../Common/ontology/dbo';
import meeting from '../../../../../ontology/meeting';
import CardContent from '../../../../Common/components/Card/CardContent';
import CardHeader from '../../../../Common/components/Card/CardHeader';
import {
  alertDialogTopology,
  containerTopology,
  fullResourceTopology,
} from '../../../../Common/topologies';
import Card from '../../../../Common/topologies/Card';
import CardRow from '../../../../Common/topologies/Card/CardRow';
import DetailsBar, { DetailsBarVariant } from '../../../../Common/topologies/DetailsBar';
import ontola from '../../../../Kernel/ontology/ontola';
import argu from '../../../ontology/argu';

import OfferActionButtons from './OfferActionButtons';

const OfferContainer: FC = () => (
  <Card>
    <Property label={ontola.coverPhoto} />
    <HeadingContext>
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
    </HeadingContext>
  </Card>
);

OfferContainer.type = schema.Offer;

OfferContainer.topology = [
  alertDialogTopology,
  fullResourceTopology,
  containerTopology,
];

export default register(OfferContainer);
