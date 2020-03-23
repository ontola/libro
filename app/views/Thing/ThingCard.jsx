import schema from '@ontologies/schema';
import rdfs from '@ontologies/rdfs';
import foaf from '@ontologies/foaf';
import HttpStatus from 'http-status-codes';
import { Property, register } from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import { handleErrorStatuses } from '../../components/Error';
import { LoadingOpinion } from '../../components/Loading';
import argu from '../../ontology/argu';
import dbo from '../../ontology/dbo';
import meeting from '../../ontology/meeting';
import { cardTopology } from '../../topologies/Card';
import { cardFixedTopology } from '../../topologies/Card/CardFixed';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import CardRow from '../../topologies/Card/CardRow';

const ThingCard = () => (
  <CardRow>
    <CardContent>
      <Property
        label={argu.opinion}
        onError={handleErrorStatuses([HttpStatus.FORBIDDEN])}
        onLoad={LoadingOpinion}
      />
      <Property label={[schema.name, rdfs.label, foaf.name]} />
      <Property label={[schema.text, schema.description, dbo.abstract]} />
      <Property label={meeting.attachment} />
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