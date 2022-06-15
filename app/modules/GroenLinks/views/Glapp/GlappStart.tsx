import * as schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import teamGL from '../../ontology/teamGL';
import {
  allTopologiesExcept,
  pageTopology,
  parentTopology,
} from '../../../../topologies';
import { CardMain } from '../../../../topologies/Card';
import Container from '../../../../topologies/Container';
import CardContent from '../../../Common/components/Card/CardContent';

import SearchPostalForm from './SearchPostalForm';

const GlappStart = () => (
  <Container>
    <CardMain>
      <CardContent>
        <Property label={schema.name} />
        <Property label={schema.text} />
        <SearchPostalForm />
      </CardContent>
    </CardMain>
  </Container>
);

GlappStart.type = teamGL.GlappStart;

GlappStart.topology = allTopologiesExcept(
  parentTopology,
  pageTopology,
);

export default register(GlappStart);
