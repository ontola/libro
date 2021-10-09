import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import {
  Resource,
  register,
  useGlobalIds, 
} from 'link-redux';
import React from 'react';

import { bestType } from '../../../helpers/data';
import { detailsBarTopology } from '../../../topologies/DetailsBar';

const TypeDetail = () => {
  const type = useGlobalIds(rdfx.type);
  const best = bestType(type);

  if (best === null) {
    return null;
  }

  return (
    <Resource
      subject={best}
      onError={() => null}
    />
  );
};

TypeDetail.type = schema.Thing;

TypeDetail.property = rdfx.type;

TypeDetail.topology = detailsBarTopology;

export default register(TypeDetail);
