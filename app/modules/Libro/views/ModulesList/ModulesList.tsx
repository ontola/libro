import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import {
  Resource,
  register,
  useLRS,
  useTempRecords,
} from 'link-redux';
import React from 'react';

import { useTempCollection } from '../../../Collection/hooks/useTempCollection';
import app from '../../../Common/ontology/app';
import { gridTopology } from '../../../Common/topologies';
import Container from '../../../Common/topologies/Container';
import { modulesKey } from '../../../Kernel/lib/settings';
import libro from '../../../Kernel/ontology/libro';

const ModulesList = () => {  const lrs = useLRS();
  const modules = lrs.settings.get(modulesKey);

  const items = useTempRecords(modules, (module, set) => {
    set(rdfx.type, schema.Thing);
    set(schema.name, module.name ?? 'unnamed');
    set(libro.module.topologiesCount, module.topologies.length.toString());
    set(libro.module.type, module.type);
    set(libro.module.viewsCount, module.views.length.toString());
  }, [modules]);

  const collection = useTempCollection(
    app.ns('home/widgets/bootstrap/modules/collection'),
    items,
    [
      schema.name,
      libro.module.type,
      libro.module.topologiesCount,
      libro.module.viewsCount,
    ],
  );

  return (
    <Container>
      <Resource subject={collection} />
    </Container>
  );
};

ModulesList.type = libro.bootstrap.ModulesList;

ModulesList.topology = gridTopology;

export default register(ModulesList);
