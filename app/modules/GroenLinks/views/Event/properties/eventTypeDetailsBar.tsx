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

import Detail from '../../../../Common/components/Detail';
import { normalizeFontAwesomeIRI } from '../../../../Common/lib/iris';
import { contentDetailsTopology, detailsBarTopology } from '../../../../Common/topologies';
import teamGL from '../../../ontology/teamGL';

const EventTypeDetailsBar = ({ linkedProp }: PropertyProps) => {
  const [image] = useProperty(schema.image);
  useDataFetching([linkedProp].filter(isNamedNode));
  const [name] = useFields(isNamedNode(linkedProp) ? linkedProp : undefined, schema.name);

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
