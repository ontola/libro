import { Property, register } from 'link-redux';
import React from 'react';

import ontola from '../../ontology/ontola';
import { formFooterTopology } from '../../topologies/FormFooter/Footer';

import { ActorTypes } from './types';

const CurrentActorFooter = () => (
  <Property label={ontola.actor} />
);

CurrentActorFooter.type = ActorTypes;

CurrentActorFooter.topology = formFooterTopology;

export default register(CurrentActorFooter);
