/**
* @jest-environment jsdom
*/
import rdf, { NamedNode } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import { seq } from 'link-lib';
import * as schema from '@ontologies/schema';
import React from 'react';
import { Resource } from 'link-redux';
import userEvent from '@testing-library/user-event';

import { renderLinked, waitFor } from '../../../test-utils';
import elements from '../../../ontology/elements';
import example from '../../../ontology/example';
import Container from '../../../topologies/Container';
import argu from '../../../ontology/argu';

const s = (x: NamedNode) => x.toString();

const doc1 = example.ns('doc1');
const doc2 = example.ns('doc2');
const doc3 = example.ns('doc3');
const doc4 = example.ns('doc4');
const doc5 = example.ns('doc5');

const document = (iri: NamedNode, ...children: Array<Record<string, unknown>>) => ({
  [s(iri)]: {
    [s(rdfx.type)]: elements.Document,
    '@id': iri,
    [s(elements.children)]: seq(children),
  },
});

const resources = {
  ...document(doc1, {
    [s(rdfx.type)]: elements.Button,
    [s(schema.text)]: 'My Fancy Button',
    [s(elements.color)]: '#ff0000',
  }),
  ...document(doc2, {
    [s(rdfx.type)]: elements.Button,
    [s(schema.text)]: 'My Fancy Button',
    [s(elements.color)]: '#ff0000',
    [s(argu.trackingId)]: 'my-fancy-tracking-id',
  }),
  ...document(doc3, {
    [s(rdfx.type)]: elements.Button,
    [s(schema.text)]: 'My Fancy Button',
    [s(elements.color)]: '#ff0000',
    [s(schema.image)]: 'chevron-right',
    [s(elements.iconPosition)]: 'start',
  }),
  ...document(doc4, {
    [s(rdfx.type)]: elements.Button,
    [s(schema.text)]: 'My Fancy Button',
    [s(elements.color)]: '#ff0000',
    [s(schema.image)]: 'chevron-left',
    [s(elements.iconPosition)]: 'end',
  }),
  ...document(doc5, {
    [s(rdfx.type)]: elements.Button,
    [s(schema.text)]: 'My Fancy Button',
    [s(elements.color)]: '#ff0000',
    [s(elements.href)]: rdf.namedNode('http://example.com'),
  }),
};

const renderDoc = async (iri: NamedNode) => renderLinked((
  <Container>
    <Resource subject={iri} />
  </Container>
), { resources });

describe('Elements Button', () => {
  it('renders', async () => {
    const { getByText } = await renderDoc(doc1);

    const label = getByText('My Fancy Button');

    expect(label).toBeVisible();
  });

  it('applies a given tracking id', async () => {
    const { getByRole } = await renderDoc(doc2);
    const button = getByRole('button');

    expect(button).toHaveAttribute('id', 'my-fancy-tracking-id');
  });

  it('renders a start icon', async () => {
    const { getByText, getByTestId } = await renderDoc(doc3);
    const label = getByText('My Fancy Button');
    const icon = getByTestId('Button-icon');

    expect(label).toBeVisible();
    expect(icon).toBeVisible();
  });

  it('renders an end icon', async () => {
    const { getByText, getByTestId } = await renderDoc(doc4);
    const label = getByText('My Fancy Button');
    const icon = getByTestId('button-end-icon');

    expect(label).toBeVisible();
    expect(icon).toBeVisible();
  });

  it('navigates when clicked on', async () => {
    const { getByRole } = await renderDoc(doc5);
    const button = getByRole('button');

    expect(button).toBeVisible();

    userEvent.click(button);

    waitFor(() => expect(window.location.href).toBe('http://example.com'));
  });
});
