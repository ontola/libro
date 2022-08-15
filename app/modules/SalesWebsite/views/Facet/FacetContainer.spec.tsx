/**
 * @jest-environment jsdom
 */

import * as as from '@ontologies/as';
import { NamedNode } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import userEvent from '@testing-library/user-event';
import { seq as libSeq } from 'link-lib';
import { Resource } from 'link-redux';
import React from 'react';

import { renderLinked } from '../../../../../tests/test-utils';
import Container from '../../../Common/topologies/Container';
import example from '../../../Kernel/ontology/example';
import ontola from '../../../Kernel/ontology/ontola';
import dependencies from '../../dependencies';
import sales from '../../ontology/sales';

const s = (x: NamedNode) => x.toString();
const seq = (...args: Array<Record<string, unknown>>) => libSeq(args);

const animationData = '{ "v": "5.0.1", "fr": 10, "ip": 0, "op": 1, "w": 10, "h": 10, "ddd": 0, "assets": [], "layers": [{ "ind": 1, "nm": "Layer 1", "ks": { "p": { "a": 1, "k": [{ "t": 0, "s": [1.5, 4.5, 0], "to": [0, 0, 0], "ti": [0, 0, 0], "i": { "x": [0.833], "y": [0.833] }, "o": { "x": [0.167], "y": [0.167] }, "e": [8.5, 4.5, 0] }, { "t": 1, "s": [8.5, 4.5, 0] }] }, "a": { "a": 0, "k": [0, 0, 0] }, "s": { "a": 0, "k": [100, 100, 100] }, "r": { "a": 0, "k": 0 }, "o": { "a": 0, "k": 100 } }, "ao": 0, "ip": 0, "op": 1, "st": 0, "bm": 0, "sr": 1, "ty": 4, "shapes": [{ "ty": "gr", "it": [{ "d": 1, "ty": "el", "s": { "a": 0, "k": [3, 3] }, "p": { "a": 0, "k": [0, 0] } }, { "ty": "fl", "c": { "a": 0, "k": [0.867, 0.867, 0.867, 1] }, "hd": false, "o": { "a": 0, "k": 100 }, "r": 1 }, { "ty": "tr", "p": { "a": 0, "k": [0, 0] }, "a": { "a": 0, "k": [0, 0] }, "s": { "a": 0, "k": [100, 100] }, "r": { "a": 0, "k": 0 }, "o": { "a": 0, "k": 100 }, "sk": { "a": 0, "k": 0 }, "sa": { "a": 0, "k": 0 } }], "nm": "Object", "hd": false }] }], "markers": []}';
const returnValue = [JSON.parse(animationData), () => null];
jest.mock('../../../Common/hooks/useJSON', () => () => returnValue);

const facetIRI = example.ns('facet');

const resources = {
  [s(facetIRI)]: {
    '@id': facetIRI,
    [s(rdfx.type)]: sales.Facet,
    [s(schema.name)]: 'Gebruiksvriendelijk',
    [s(schema.text)]: 'Toegankelijk voor iedereen',
    [s(sales.flexDirection)]: 'forward',
    [s(as.items)]: seq(
      {
        [s(schema.name)]: 'Gratis Animaties voor 5 euro',
        [s(schema.text)]: 'Voor maar 5 euro krijg je de mooiste gratis animaties.',
        [s(schema.image)]: {
          [s(rdfx.type)]: ontola.LottieAnimation,
          [s(schema.contentUrl)]: 'https://gratis-animaties-voor-vijf-euro.nl/animaties/glitterplaatje',
        },
      },
      {
        [s(schema.name)]: 'Aangifte doen',
        [s(schema.text)]: 'De plek om aangifte te doen wanneer je geld betaald hebt voor gratis spullen.',
        [s(rdfx.type)]: ontola.LottieAnimation,
        [s(schema.contentUrl)]: 'https://aangiftedoen.politie.nl/oplichtingen',
        [s(sales.animationSplit)]: 1,
        [s(sales.animationLength)]: 2,
      },
    ),
  },
};

const render = () => renderLinked((
  <Container>
    <Resource
      subject={facetIRI}
    />
  </Container>
), {
  modules: dependencies,
  resources,
});

describe('FacetContainer', () => {
  it('renders', async () => {
    jest.useRealTimers();
    const { getByText } = await render();

    const facet1Title = getByText('Gratis Animaties voor 5 euro');
    const facet1Text = getByText('Voor maar 5 euro krijg je de mooiste gratis animaties.');
    const facet2Title = getByText('Aangifte doen');
    const facet2Text = getByText('De plek om aangifte te doen wanneer je geld betaald hebt voor gratis spullen.');

    expect(facet1Title).toBeVisible();
    expect(facet1Text).toBeVisible();
    expect(facet2Title).toBeVisible();
    expect(facet2Text).not.toBeVisible();
  });

  it('changes facet when clicking other facet', async () => {
    const { getByText, findByText } = await render();

    const facet1Text = getByText('Voor maar 5 euro krijg je de mooiste gratis animaties.');
    const facet2Title = getByText('Aangifte doen');

    expect(facet1Text).toBeVisible();

    await userEvent.click(facet2Title);

    const facet2Text = await findByText('De plek om aangifte te doen wanneer je geld betaald hebt voor gratis spullen.');

    expect(facet2Text).toBeVisible();
  });
});
