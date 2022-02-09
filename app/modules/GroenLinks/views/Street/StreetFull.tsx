import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  Property,
  Resource,
  register,
  useLRS,
} from 'link-redux';
import React from 'react';

import AllWithProperty from '../../../../components/AllWithProperty';
import CardContent from '../../../../components/Card/CardContent';
import Collection from '../../../../components/Collection';
import { entityIsLoaded } from '../../../../helpers/data';
import app from '../../../../ontology/app';
import teamGL from '../../../../ontology/teamGL';
import CardMain from '../../../../topologies/Card/CardMain';
import Container from '../../../../topologies/Container';
import { fullResourceTopology } from '../../../../topologies/FullResource';

const PRELOAD_IRIS = [
  app.ns('enums/surveys/did_vote'),
  app.ns('enums/visits/flyer'),
  app.ns('enums/visits/newsletter'),
  app.ns('enums/visits/result#neutral'),
  app.ns('enums/visits/spoke_somebody'),
  app.ns('forms/remarks'),
  app.ns('forms/surveys'),
  app.ns('forms/visits'),
];

const StreetFull = () => {
  const lrs = useLRS();
  PRELOAD_IRIS.forEach((iri) => {
    if (__CLIENT__ && !entityIsLoaded(lrs, iri)) {
      lrs.queueEntity(iri);
    }
  });

  return (
    <Container>
      <CardMain>
        <CardContent noSpacing>
          <Property label={[schema.name, rdfs.label]} />
          <p>
            <span>
              <Resource subject={teamGL.postalDigits} />
              {': '}
            </span>
            <AllWithProperty label={teamGL.postalDigits} />
          </p>
        </CardContent>
      </CardMain>
      <Collection
        display="table"
        label={teamGL.pendingAddresses}
      />
    </Container>
  );
};

StreetFull.type = teamGL.Street;

StreetFull.topology = fullResourceTopology;

export default register(StreetFull);
