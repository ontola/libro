import rdf from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import { seq } from 'link-lib';
import { Resource } from 'link-redux';
import React from 'react';

import app from '../../ontology/app'
import ontola from '../../ontology/ontola';
import {
  cleanup,
  render,
} from '../../test-utils';

import SnackbarManager from './index';

describe('SnackbarManager', () => {
  afterAll(cleanup);

  it('renders nothing if queue is empty', async () => {
    const iri = app.ns('snackbar/manager');
    const resources = {
      '@id': iri.value,
      [rdfx.type]: ontola.ns('snackbar/Manager'),
      [ontola.ns('snackbar/queue')]: seq([]),
    };

    const { queryByTestId, debug } = await render((
      <Resource subject={iri} />
    ), { resources });
    debug();

    expect(await queryByTestId('current-snackbar')).toBeNull();
  });

  it('renders snackbar if item in queue',  async () => {
    const iri = app.ns('snackbar/manager');
    const resources = {
      '@id': iri.value,
      [rdfx.type]: ontola.ns('snackbar/Manager'),
      [ontola.ns('snackbar/queue')]: seq([
        {
          '@id': rdf.blankNode(),
          [rdfx.type]: ontola.ns('snackbar/Snackbar'),
          [schema.text]: '',
        },
      ]),
    };

    const { queryByTestId } = await render((
      <Resource subject={iri} />
    ), { resources });

    expect(await queryByTestId('current-snackbar')).not.toBeNull();
  });
});
