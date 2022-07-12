import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import {
  Resource,
  register,
  useLRS,
  useTempRecords,
} from 'link-redux';
import React from 'react';

import { allTopologies } from '../../../../topologies';
import { useTempCollection } from '../../../Collection/hooks/useTempCollection';
import app from '../../../Common/ontology/app';
import Container from '../../../Common/topologies/Container';
import { topologiesKey } from '../../../Kernel/lib/settings';
import libro from '../../../Kernel/ontology/libro';

const TopologiesList = () => {
  const lrs = useLRS();
  const topologies = lrs.settings.get(topologiesKey);

  const items = useTempRecords(topologies, (topology, set) => {
    set(rdfx.type, schema.Thing);
    set(schema.name, topology?.value ?? 'default (undefined)');
  }, [topologies]);

  const collection = useTempCollection(
    app.ns('home/widgets/bootstrap/topologies/collection'),
    items,
    [schema.name],
  );

  return (
    <Container>
      <Resource subject={collection} />
    </Container>
  );
};

TopologiesList.type = libro.bootstrap.TopologiesList;

TopologiesList.topology = allTopologies;

export default register(TopologiesList);
