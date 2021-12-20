import * as skos from '@ontologies/skos';
import { Property, register } from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import { allTopologies } from '../../topologies';

const TermGrid = () => <Property label={skos.exactMatch} />;

TermGrid.type = argu.Term;

TermGrid.topology = allTopologies;

export default register(TermGrid);
