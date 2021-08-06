import { NamedNode } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import {
  FC,
  PropertyProps,
  Resource,
  ReturnType,
  register,
} from 'link-redux';
import React from 'react';

import { bestType } from '../../../helpers/data';
import { detailsBarTopology } from '../../../topologies/DetailsBar';

interface TypeDetailProps extends PropertyProps {
  type: NamedNode[];
}

const TypeDetail: FC<TypeDetailProps> = ({ type }) => {
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

TypeDetail.mapDataToProps = {
  type: {
    label: rdfx.type,
    returnType: ReturnType.AllTerms ,
  },
};

export default register(TypeDetail);
