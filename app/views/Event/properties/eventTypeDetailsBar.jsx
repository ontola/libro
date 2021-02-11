import * as schema from '@ontologies/schema';
import {
  linkType,
  linkedPropType,
  register,
  useDataFetching,
  useResourceProperty,
} from 'link-redux';
import React from 'react';

import Detail from '../../../components/Detail';
import { normalizeFontAwesomeIRI } from '../../../helpers/iris';
import teamGL from '../../../ontology/teamGL';
import { contentDetailsTopology } from '../../../topologies/ContentDetails';
import { detailsBarTopology } from '../../../topologies/DetailsBar';


const EventTypeDetailsBar = ({ image, linkedProp }) => {
  useDataFetching([linkedProp]);
  const [name] = useResourceProperty(linkedProp, schema.name);

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

EventTypeDetailsBar.mapDataToProps = {
  image: schema.image,
};

EventTypeDetailsBar.propTypes = {
  image: linkType,
  linkedProp: linkedPropType,
};

export default register(EventTypeDetailsBar);
