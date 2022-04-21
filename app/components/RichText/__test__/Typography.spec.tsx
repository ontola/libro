/**
* @jest-environment jsdom
*/

import { NamedNode } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import { seq } from 'link-lib';
import * as schema from '@ontologies/schema';
import React from 'react';
import { Resource } from 'link-redux';

import example from '../../../ontology/example';
import elements from '../../../ontology/elements';
import { renderLinked } from '../../../test-utils';
import Container from '../../../topologies/Container';

type Heading = 'H1' | 'H2' | 'H3' | 'H4' | 'H5' | 'H6';

const s = (x: NamedNode) => x.toString();

const doc1 = example.ns('doc1');

const document = (iri: NamedNode, ...children: Array<Record<string, unknown>>) => ({
  [s(iri)]: {
    [s(rdfx.type)]: elements.Document,
    '@id': iri,
    [s(elements.children)]: seq(children),
  },
});

const text = (content: string) => ({
  [s(rdfx.type)]: elements.InnerText,
  [s(schema.text)]: content,
});

const heading = (variant: Heading, content: string) => ({
  [s(rdfx.type)]: elements[variant],
  [s(elements.children)]: seq([text(content)]),
});

const resources = {
  ...document(doc1,
    heading('H1', 'Spreekbeurt over het Nijlpaard.'),
    {
      [s(rdfx.type)]: elements.P,
      [s(elements.align)]: 'center',
      [s(elements.children)]: seq([
        text('Gebaseerd op een echt gebeurt vehaal'),
      ]),
    },
    {
      [s(rdfx.type)]: elements.P,
      [s(elements.children)]: seq([
        text('Welkom bij mijn spreekbeurt.'),
      ]),
    },
    heading('H2', 'Geschiedenis'),
    heading('H3', 'Egypte'),
    heading('H4', 'Oorlog met de krokodillen'),
    heading('H5', 'Generaal Nelly'),
    heading('H6', 'Huiselijk geweld'),
  ),
};

const renderDoc = async (iri: NamedNode) => renderLinked((
  <Container>
    <Resource subject={iri} />
  </Container>
), { resources });

describe('Typography', () => {
  it('renders', async () => {
    const { getByText } = await renderDoc(doc1);

    expect(getByText('Spreekbeurt over het Nijlpaard.')).toBeVisible();
    expect(getByText('Gebaseerd op een echt gebeurt vehaal')).toBeVisible();
    expect(getByText('Welkom bij mijn spreekbeurt.')).toBeVisible();
    expect(getByText('Geschiedenis')).toBeVisible();
    expect(getByText('Egypte')).toBeVisible();
    expect(getByText('Oorlog met de krokodillen')).toBeVisible();
    expect(getByText('Generaal Nelly')).toBeVisible();
    expect(getByText('Huiselijk geweld')).toBeVisible();
  });
});
