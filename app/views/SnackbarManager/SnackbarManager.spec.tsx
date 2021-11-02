/**
 * @jest-environment jsdom
 */

import rdf from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import { seq } from 'link-lib';
import { Resource } from 'link-redux';
import React from 'react';

import app from '../../ontology/app';
import ontola from '../../ontology/ontola';
import {
  cleanup,
  renderLinked,
} from '../../test-utils';

describe('SnackbarManager', () => {
  afterAll(cleanup);

  it('renders nothing if queue is empty', async () => {
    const iri = app.ns('snackbar/manager');
    const resources = {
      '@id': iri.value,
      [rdfx.type.toString()]: ontola.ns('snackbar/Manager'),
      [ontola.ns('snackbar/queue').toString()]: seq([]),
    };

    const { queryByTestId } = await renderLinked((
      <Resource subject={iri} />
    ), { resources });

    expect(await queryByTestId('current-snackbar')).toBeNull();
  });

  it('renders snackbar if item in queue',  async () => {
    const iri = app.ns('snackbar/manager');
    const resources = {
      '@id': iri.value,
      [rdfx.type.toString()]: ontola.ns('snackbar/Manager'),
      [ontola.ns('snackbar/queue').toString()]: seq([
        {
          '@id': rdf.blankNode(),
          [rdfx.type.toString()]: ontola.ns('snackbar/Snackbar'),
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
