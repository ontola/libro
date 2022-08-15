import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  Property,
  Resource,
  register,
  useLRS,
} from 'link-redux';
import React from 'react';

import Collection from '../../../Collection/components';
import AllWithProperty from '../../../Common/components/AllWithProperty';
import CardContent from '../../../Common/components/Card/CardContent';
import { fullResourceTopology } from '../../../Common/topologies';
import CardMain from '../../../Common/topologies/Card/CardMain';
import Container from '../../../Common/topologies/Container';
import { entityIsLoaded } from '../../../Kernel/lib/data';
import app from '../../../Common/ontology/app';
import teamGL from '../../ontology/teamGL';

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
