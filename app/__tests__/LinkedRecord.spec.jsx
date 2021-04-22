import * as rdfx from '@ontologies/rdf';
import * as owl from '@ontologies/owl';
import * as schema from '@ontologies/schema';
import { Resource } from 'link-redux';
import React from 'react';

import argu from '../ontology/argu';
import ex from '../ontology/ex'
import example from '../ontology/example';
import Container from '../topologies/Container'
import { cleanup, render } from '../test-utils';

describe('Search', () => {
  afterAll(cleanup);

  const externalIRI = ex.ns('externalResource');
  const lrIRI = example.ns(`lr/${btoa(externalIRI.value)}`);

  const linkedRecord = {
    '@id': lrIRI.value,
    [rdfx.type]: argu.LinkedRecord,
    [owl.sameAs]: externalIRI.value,
    [argu.commentsCount]: 0,
    [schema.comment]: example.ns(`lr/${btoa(externalIRI.value)}/c`),
  }
  const externalPerson = {
    '@id': externalIRI.value,
    [rdfx.type]: schema.Person,
    [schema.name]: 'Peter',
    [owl.sameAs]: [
      lrIRI,
      externalIRI
    ],
  }

  const resources = [
    linkedRecord,
    externalPerson,
  ];

  describe('within Container', () => {
    it('renders the non-lr component on cross-sameAs references', async () => {
      const {
        getByRole,
      } = await render(() => (
        <Container>
          <Resource forceRender subject={lrIRI} />
        </Container>
      ), { resources });

      expect(getByRole('heading')).toHaveTextContent('Peter');
    });
  });
});
