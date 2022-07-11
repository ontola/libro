import * as as from '@ontologies/as';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import {
  Resource,
  register,
  useLRS,
  useTempRecord,
  useTempRecords,
} from 'link-redux';
import React from 'react';

import { allTopologies } from '../../../../topologies';
import app from '../../../Common/ontology/app';
import Container from '../../../Common/topologies/Container';
import { topologiesKey } from '../../../Kernel/lib/topologiesKey';
import libro from '../../../Kernel/ontology/libro';
import ontola from '../../../Kernel/ontology/ontola';

const TopologiesList = () => {
  const lrs = useLRS();
  const topologies = lrs.settings.get(topologiesKey);

  const items = useTempRecords(topologies, (topology, set) => {
    set(rdfx.type, schema.Thing);
    set(schema.name, topology?.value ?? 'default (undefined)');
  }, [topologies]);

  const itemsSeq = useTempRecord(rdfx.Seq, (set) => {
    items.forEach((it, i) => {
      set(rdfx.ns(`_${i}`), it);
    });
  }, [items]);

  const columns = useTempRecord(rdfx.Seq, (set) => {
    set(rdfx.ns('_0'), schema.name);
  }, []);

  const [collection] = React.useState(app.ns('home/widgets/bootstrap/topologies/collection'));
  const [view] = React.useState(app.ns('home/widgets/bootstrap/topologies/collection?page=1'));

  useTempRecord(ontola.PaginatedView, (set) => {
    set(schema.isPartOf, collection);
    set(as.partOf, collection);
    set(ontola.baseCollection, collection);
    set(ontola.collectionDisplay, ontola['collectionDisplay/table']);
    set(as.items, itemsSeq);
    set(as.totalItems, topologies.length.toString());
  }, [collection, itemsSeq], view);

  useTempRecord(ontola.Collection, (set) => {
    set(as.name, `Topologies (${topologies.length})`);
    set(ontola.columns, columns);
    set(ontola.collectionDisplay, ontola['collectionDisplay/table']);
    set(ontola.defaultType, ontola['collectionType/paginated']);
    set(ontola.iriTemplate, collection);
    set(ontola.pages, view);
    set(as.first, view);
    set(as.last, view);
    set(as.totalItems, topologies.length.toString());
  }, [view, columns], collection);

  return (
    <Container>
      <Resource subject={collection} />
    </Container>
  );
};

TopologiesList.type = libro.bootstrap.TopologiesList;

TopologiesList.topology = allTopologies;

export default register(TopologiesList);
