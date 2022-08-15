import { Property, register } from 'link-redux';
import React from 'react';

import { formFooterTopology } from '../../../Form/topologies';
import ontola from '../../../Kernel/ontology/ontola';

import { ActorTypes } from './types';

const CurrentActorFooter = () => (
  <Property label={ontola.actor} />
);

CurrentActorFooter.type = ActorTypes;

CurrentActorFooter.topology = formFooterTopology;

export default register(CurrentActorFooter);
