/**
 * @jest-environment jsdom
 */

import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import { NamedNode } from '@ontologies/core';
import React from 'react';
import { Resource } from 'link-redux';

import ontola from '../../ontology/ontola';
import example from '../../ontology/example';
import { renderLinked, waitFor } from '../../test-utils';

const animationData = '{ "v": "5.0.1", "fr": 10, "ip": 0, "op": 1, "w": 10, "h": 10, "ddd": 0, "assets": [], "layers": [{ "ind": 1, "nm": "Layer 1", "ks": { "p": { "a": 1, "k": [{ "t": 0, "s": [1.5, 4.5, 0], "to": [0, 0, 0], "ti": [0, 0, 0], "i": { "x": [0.833], "y": [0.833] }, "o": { "x": [0.167], "y": [0.167] }, "e": [8.5, 4.5, 0] }, { "t": 1, "s": [8.5, 4.5, 0] }] }, "a": { "a": 0, "k": [0, 0, 0] }, "s": { "a": 0, "k": [100, 100, 100] }, "r": { "a": 0, "k": 0 }, "o": { "a": 0, "k": 100 } }, "ao": 0, "ip": 0, "op": 1, "st": 0, "bm": 0, "sr": 1, "ty": 4, "shapes": [{ "ty": "gr", "it": [{ "d": 1, "ty": "el", "s": { "a": 0, "k": [3, 3] }, "p": { "a": 0, "k": [0, 0] } }, { "ty": "fl", "c": { "a": 0, "k": [0.867, 0.867, 0.867, 1] }, "hd": false, "o": { "a": 0, "k": 100 }, "r": 1 }, { "ty": "tr", "p": { "a": 0, "k": [0, 0] }, "a": { "a": 0, "k": [0, 0] }, "s": { "a": 0, "k": [100, 100] }, "r": { "a": 0, "k": 0 }, "o": { "a": 0, "k": 100 }, "sk": { "a": 0, "k": 0 }, "sa": { "a": 0, "k": 0 } }], "nm": "Object", "hd": false }] }], "markers": []}';
const returnValue = [JSON.parse(animationData)];
jest.mock('../../hooks/useJSON', () => () => returnValue);

const s = (x: NamedNode) => x.toString();

const animationIRI = example.ns('animationIRI');

const resources = {
  [s(animationIRI)]: {
    '@id': animationIRI,
    [s(rdfx.type)]: ontola.LottieAnimation,
    [s(schema.contentUrl)]: 'https://gratis-animaties-voor-vijf-euro.nl/animaties/glitterplaatje',
  },
};

describe('LottieAnimation', () => {
  it('fetches data and calls onDataReady', async () => {
    const onDataReady = jest.fn();

    await renderLinked((
      <Resource
        subject={animationIRI}
        onDataReady={onDataReady}
      />
    ), { resources });

    await waitFor(() => expect(onDataReady).toHaveBeenCalled());
  });
});
