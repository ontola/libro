import { isNamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  PropertyProps,
  register,
  useDataFetching,
  useFields,
  useProperty,
} from 'link-redux';
import React from 'react';

import Detail from '../../../../../components/Detail';
import { normalizeFontAwesomeIRI } from '../../../../../helpers/iris';
import teamGL from '../../../../../ontology/teamGL';
import { contentDetailsTopology } from '../../../../../topologies/ContentDetails';
import { detailsBarTopology } from '../../../../../topologies/DetailsBar';

const EventTypeDetailsBar = ({ linkedProp }: PropertyProps) => {
  const [image] = useProperty(schema.image);
  useDataFetching([linkedProp].filter(isNamedNode));
  const [name] = useFields(schema.name, isNamedNode(linkedProp) ? linkedProp : undefined);

  return (
    <Detail
      icon={normalizeFontAwesomeIRI(image)}
      text={name?.value}
    />
  );
};

EventTypeDetailsBar.type = teamGL.Event;

EventTypeDetailsBar.topology = [
  contentDetailsTopology,
  detailsBarTopology,
];

EventTypeDetailsBar.property = teamGL.eventType;

export default register(EventTypeDetailsBar);
