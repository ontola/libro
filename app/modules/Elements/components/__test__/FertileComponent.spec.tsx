/**
 * @jest-environment jsdom
 */
import { NamedNode } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import { waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { seq } from 'link-lib';
import { Resource } from 'link-redux';
import React from 'react';

import { renderLinked } from '../../../../../tests/test-utils';
import Container from '../../../Common/topologies/Container';
import example from '../../../Core/ontology/example';
import ontola from '../../../Core/ontology/ontola';
import elements from '../../ontology/elements';

const s = (x: NamedNode) => x.toString();

const unorderedListDoc = example.ns('ulDoc');
const orderedListDoc = example.ns('olDoc');
const linkDoc = example.ns('aDoc');
const noteDoc = example.ns('noteDoc');
const tipDoc = example.ns('tipDoc');

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

const resources = {
  ...document(unorderedListDoc, {
    [s(rdfx.type)]: elements.Ul,
    [s(elements.children)]: seq([
      {
        [s(rdfx.type)]: elements.Li,
        [s(elements.children)]: seq([
          text('List element 1'),
        ]),
      },
      {
        [s(rdfx.type)]: elements.Li,
        [s(elements.children)]: seq([
          text('List element 2'),
        ]),
      },
    ]),
  }),
  ...document(orderedListDoc, {
    [s(rdfx.type)]: elements.Ol,
    [s(elements.children)]: seq([
      {
        [s(rdfx.type)]: elements.Li,
        [s(elements.children)]: seq([
          text('List element 1'),
        ]),
        [s(elements.variant)]: 'pro',
      },
      {
        [s(rdfx.type)]: elements.Li,
        [s(elements.children)]: seq([
          text('List element 2'),
        ]),
        [s(elements.variant)]: 'con',
      },
    ]),
  }),
  ...document(linkDoc, {
    [s(rdfx.type)]: elements.A,
    [s(ontola.href)]: example.ns('more-ram'),
    [s(elements.children)]: seq([
      text('Click here to download more ram'),
    ]),
  }),
  ...document(noteDoc, {
    [s(rdfx.type)]: elements.Note,
    [s(elements.children)]: seq([
      text("Don't forget to brush your teeth"),
    ]),
  }),
  ...document(tipDoc, {
    [s(rdfx.type)]: elements.Tip,
    [s(elements.color)]: '#00FF00',
    [s(elements.children)]: seq([
      text('Brush your teeth twice a day for the best results'),
    ]),
  }),
};

const renderDoc = async (iri: NamedNode) => renderLinked((
  <Container>
    <Resource subject={iri} />
  </Container>
), { resources });

describe('FertileComponent', () => {
  it('renders an unordered list', async () => {
    const { getByText } = await renderDoc(unorderedListDoc);

    const li1 = getByText('List element 1');
    const li2 = getByText('List element 2');
    expect(li1).toBeVisible();
    expect(li2).toBeVisible();
  });
  it('renders an ordered list', async () => {
    const { getByText } = await renderDoc(orderedListDoc);

    const li1 = getByText('List element 1');
    const li2 = getByText('List element 2');
    expect(li1).toBeVisible();
    expect(li2).toBeVisible();
  });

  it('renders a link', async () => {
    const { getByText } = await renderDoc(linkDoc);

    const link = getByText('Click here to download more ram');
    expect(link).toBeVisible();

    userEvent.click(link);

    waitFor(() => expect(window.location.href).toBe('http://example.com/more-ram'));
  });

  it('renders a note', async () => {
    const { getByText } = await renderDoc(noteDoc);

    const note = getByText("Don't forget to brush your teeth");
    expect(note).toBeVisible();
  });

  it('renders a tip', async () => {
    const { getByText } = await renderDoc(tipDoc);

    const tip = getByText('Brush your teeth twice a day for the best results');
    expect(tip).toBeVisible();
  });
});
