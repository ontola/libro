import * as foaf from '@ontologies/foaf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import HttpStatus from 'http-status-codes';
import { Property, register } from 'link-redux';
import React from 'react';

import argu from '../../../Argu/ontology/argu';
import dbo from '../../../../ontology/dbo';
import meeting from '../../../../ontology/meeting';
import {
  cardFixedTopology,
  cardMainTopology,
  cardTopology,
} from '../../../../topologies';
import CardRow from '../../../../topologies/Card/CardRow';
import { LoadingOpinion } from '../../../Core/components/Loading';
import AllWithProperty from '../../components/AllWithProperty';
import CardContent from '../../components/Card/CardContent';
import { handleErrorStatuses } from '../../components/Error';

const ThingCard = (): JSX.Element => (
  <CardRow>
    <CardContent>
      <Property
        label={argu.opinion}
        onError={handleErrorStatuses([HttpStatus.FORBIDDEN])}
        onLoad={LoadingOpinion}
      />
      <Property label={[schema.name, rdfs.label, foaf.name]} />
      <Property label={[schema.text, schema.description, dbo.abstract]} />
      <AllWithProperty label={meeting.attachment} />
    </CardContent>
  </CardRow>
);

ThingCard.type = schema.Thing;

ThingCard.topology = [
  cardFixedTopology,
  cardMainTopology,
  cardTopology,
];

export default register(ThingCard);