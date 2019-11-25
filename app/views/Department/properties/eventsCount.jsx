import { linkType, register } from 'link-redux';
import React from 'react';
import emoji from 'react-easy-emoji';

import { Detail } from '../../../components';
import teamGL from '../../../ontology/teamGL';
import { detailsBarTopology } from '../../../topologies/DetailsBar';
import { contentDetailsTopology } from '../../../topologies/ContentDetails';

const EventsCount = ({ linkedProp }) => (
  <Detail
    text={emoji(`📅 ${linkedProp.value}`)}
    title="Acties"
  />
);

EventsCount.type = teamGL.Department;

EventsCount.property = teamGL.eventsCount;

EventsCount.topology = [
  detailsBarTopology,
  contentDetailsTopology,
];

EventsCount.propTypes = {
  linkedProp: linkType,
};

export default register(EventsCount);
