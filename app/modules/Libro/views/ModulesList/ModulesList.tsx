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

import app from '../../../Common/ontology/app';
import Container from '../../../Common/topologies/Container';
import { gridTopology } from '../../../Common/topologies/Grid';
import { modulesKey } from '../../../Kernel/lib/settings';
import libro from '../../../Kernel/ontology/libro';
import ontola from '../../../Kernel/ontology/ontola';

const ModulesList = () => {  const lrs = useLRS();
  const modules = lrs.settings.get(modulesKey);

  const items = useTempRecords(modules, (module, set) => {
    set(rdfx.type, schema.Thing);
    set(schema.name, module.name ?? 'unnamed');
    set(libro.module.topologiesCount, module.topologies.length.toString());
    set(libro.module.type, module.type);
    set(libro.module.viewsCount, module.views.length.toString());
  }, [modules]);

  const itemsSeq = useTempRecord(rdfx.Seq, (set) => {
    items.forEach((it, i) => {
      set(rdfx.ns(`_${i}`), it);
    });
  }, [items]);

  const columns = useTempRecord(rdfx.Seq, (set) => {
    set(rdfx.ns('_0'), schema.name);
    set(rdfx.ns('_1'), libro.module.type);
    set(rdfx.ns('_2'), libro.module.topologiesCount);
    set(rdfx.ns('_3'), libro.module.viewsCount);
  }, []);

  const [collection] = React.useState(app.ns('home/widgets/bootstrap/modules/collection'));
  const [view] = React.useState(app.ns('home/widgets/bootstrap/modules/collection?page=1'));

  useTempRecord(ontola.PaginatedView, (set) => {
    set(schema.isPartOf, collection);
    set(as.partOf, collection);
    set(ontola.baseCollection, collection);
    set(ontola.collectionDisplay, ontola['collectionDisplay/table']);
    set(as.items, itemsSeq);
    set(as.totalItems, modules.length.toString());
  }, [collection, itemsSeq], view);

  useTempRecord(ontola.Collection, (set) => {
    set(as.name, `Modules (${modules.length})`);
    set(ontola.columns, columns);
    set(ontola.collectionDisplay, ontola['collectionDisplay/table']);
    set(ontola.defaultType, ontola['collectionType/paginated']);
    set(ontola.iriTemplate, collection);
    set(ontola.pages, view);
    set(as.first, view);
    set(as.last, view);
    set(as.totalItems, modules.length.toString());
  }, [view, columns], collection);

  return (
    <Container>
      <Resource subject={collection} />
    </Container>
  );
};

ModulesList.type = libro.bootstrap.ModulesList;

ModulesList.topology = gridTopology;

export default register(ModulesList);
