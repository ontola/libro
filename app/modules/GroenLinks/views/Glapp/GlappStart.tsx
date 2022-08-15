import * as schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import { allTopologiesExcept } from '../../../../topologies';
import CardContent from '../../../Common/components/Card/CardContent';
import { pageTopology, parentTopology } from '../../../Common/topologies';
import { CardMain } from '../../../Common/topologies/Card';
import Container from '../../../Common/topologies/Container';
import teamGL from '../../ontology/teamGL';

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
