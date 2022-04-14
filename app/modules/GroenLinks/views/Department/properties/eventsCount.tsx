import { PropertyProps, register } from 'link-redux';
import React from 'react';
import emoji from 'react-easy-emoji';

import Detail from '../../../../../components/Detail';
import teamGL from '../../../../../ontology/teamGL';
import { contentDetailsTopology, detailsBarTopology } from '../../../../../topologies';

const EventsCount = ({ linkedProp }: PropertyProps) => (
  <Detail
    text={emoji(`📅 ${linkedProp.value}`)}
    title="Acties"
  />
);

EventsCount.type = teamGL.Department;

EventsCount.property = teamGL.totalFutureEventsCount;

EventsCount.topology = [
  detailsBarTopology,
  contentDetailsTopology,
];

export default register(EventsCount);
