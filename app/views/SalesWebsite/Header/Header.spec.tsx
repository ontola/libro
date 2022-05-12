/**
 * @jest-environment jsdom
 */

import { seq as libSeq } from 'link-lib';
import rdf, { NamedNode } from '@ontologies/core';
import React from 'react';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import { Resource } from 'link-redux';

import example from '../../../ontology/example';
import elements from '../../../ontology/elements';
import { renderLinked } from '../../../test-utils';
import sales from '../../../ontology/sales';

import { HeaderTheme } from '.';

const s = (x: NamedNode) => x.toString();
const seq = (...args: Array<Record<string, unknown>>) => libSeq(args);
const url = (uri: string) => rdf.namedNode(uri);

const header1Iri = example.ns('header1');
const header2Iri = example.ns('header2');
const header3Iri = example.ns('header3');
const header4Iri = example.ns('header4');

const images = {
  [s(sales.backgroundImage)]: url('https://plaatjes.nl/mijnplaatje.jpg'),
  [s(sales.backgroundImageMobile)]: url('https://plaatjes.nl/mijnplaatje.jpg'),
  [s(sales.backgroundImageXL)]: url('https://plaatjes.nl/mijnplaatje.jpg'),
};

const resources = {
  [s(header1Iri)]: {
    '@id': header1Iri,
    [s(rdfx.type)]: sales.Header,
    [s(schema.name)]: 'Titelachtige text',
    ...images,
  },
  [s(header2Iri)]: {
    '@id': header2Iri,
    [s(rdfx.type)]: sales.Header,
    [s(schema.name)]: 'Hondenvoer',
    [s(schema.text)]: 'Ook lekker op brood!',
    ...images,
  },
  [s(header3Iri)]: {
    '@id': header3Iri,
    [s(rdfx.type)]: sales.Header,
    [s(schema.name)]: 'Argu App Applicatie',
    [s(schema.text)]: {
      [s(rdfx.type)]: elements.Document,
      [s(elements.children)]: seq(
        {
          [s(rdfx.type)]: elements.P,
          [s(elements.children)]: seq(
            {
              [s(rdfx.type)]: elements.InnerText,
              [s(schema.text)]: 'De nummer 1 app voor mensen die een app nodig hebben!',
            },
          ),
        },
      ),
    },
    ...images,
  },
  [s(header4Iri)]: {
    '@id': header4Iri,
    [s(rdfx.type)]: sales.Header,
    [s(schema.name)]: 'De grootste knoppenwinkel van Nederland',
    [s(sales.buttonText)]: 'Ons prachtstuk',
    [s(sales.buttonLink)]: url('https://www.knoppenwinkel.nl/prachtstuk'),
    ...images,
  },
};

const render = (iri: NamedNode, theme: HeaderTheme = HeaderTheme.Default) => renderLinked((
  <Resource
    subject={iri}
    theme={theme}
  />
), { resources });

describe('Sales Header Test', () => {
  describe('Default Headers', () => {
    it('renders', async () => {
      const { getByText } = await render(header1Iri);

      const title = getByText('Titelachtige text');

      expect(title).toBeVisible();
    });

    it('renders simple string subtitle', async () => {
      const { getByText } = await render(header2Iri);

      const title = getByText('Hondenvoer');
      const text = getByText('Ook lekker op brood!');

      expect(title).toBeVisible();
      expect(text).toBeVisible();
    });

    it('renders elements subtitle', async () => {
      const { getByText } = await render(header3Iri);

      const title = getByText('Argu App Applicatie');
      const text = getByText('De nummer 1 app voor mensen die een app nodig hebben!');

      expect(title).toBeVisible();
      expect(text).toBeVisible();
    });

    it('renders a call to action button', async () => {
      const { getByText } = await render(header4Iri);

      const button = getByText('Ons prachtstuk');

      expect(button).toBeVisible();
    });

    it('renders a subcomponent', async () => {
      const { getByText } = await renderLinked((
        <Resource
          subComponent={(
            <div>
              subcomponent
            </div>
          )}
          subject={header1Iri}
        />
      ), { resources });

      const subComponent = getByText('subcomponent');

      expect(subComponent).toBeVisible();
    });
  });

  describe('Homepage Header', () => {
    it('renders', async () => {
      const { getByText } = await render(header1Iri, HeaderTheme.HomePage);

      const title = getByText('Titelachtige text');

      expect(title).toBeVisible();
    });
  });
});
