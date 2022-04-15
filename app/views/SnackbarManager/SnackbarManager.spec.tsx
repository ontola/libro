/**
 * @jest-environment jsdom
 */

import rdf from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import { seq } from 'link-lib';
import { Resource } from 'link-redux';
import React from 'react';

import libro from '../../ontology/libro';
import { renderLinked } from '../../test-utils';

describe('SnackbarManager', () => {
  it('renders nothing if queue is empty', async () => {
    const iri = libro.ns('snackbar/manager');
    const resources = {
      '@id': iri.value,
      [rdfx.type.toString()]: libro.ns('snackbar/Manager'),
      [libro.ns('snackbar/queue').toString()]: seq([]),
    };

    const { queryByTestId } = await renderLinked((
      <Resource subject={iri} />
    ), { resources });

    expect(await queryByTestId('current-snackbar')).toBeNull();
  });

  it('renders snackbar if item in queue',  async () => {
    const iri = libro.ns('snackbar/manager');
    const resources = {
      '@id': iri.value,
      [rdfx.type.toString()]: libro.ns('snackbar/Manager'),
      [libro.ns('snackbar/number').toString()]: rdf.literal(0),
      [libro.ns('snackbar/current').toString()]: rdf.literal(0),
      [libro.ns('snackbar/queue').toString()]: seq([
        {
          '@id': rdf.blankNode(),
          [rdfx.type.toString()]: libro.ns('snackbar/Snackbar'),
          [schema.text.toString()]: '',
        },
      ]),
    };

    const { queryByTestId } = await renderLinked((
      <Resource subject={iri} />
    ), { resources });

    expect(await queryByTestId('current-snackbar')).not.toBeNull();
  });
});
