/**
 * @jest-environment jsdom
 */

import rdf from '@ontologies/core';
import * as dcterms from '@ontologies/dcterms';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import { Resource } from 'link-redux';
import React from 'react';

import { renderLinked } from '../../../../../tests/test-utils';
import dbo from '../../../../ontology/dbo';
import Page from '../../topologies/Page';

describe('MediaObject', () => {
  const resource = rdf.namedNode('http://example.com/media_objects/1');
  const parent = rdf.namedNode('http://example.com/page/1');

  const CONTENT_URL = 'http://example.com/media_objects/1.png';
  const FILE_NAME = '1.png';
  const PARENT_NAME = 'Parent resource';

  const resources = {
    '@id': resource.value,
    [rdfx.type.toString()]: schema.MediaObject,
    [schema.encodingFormat.toString()]: rdf.literal('image/png'),
    [dbo.filename.toString()]: rdf.literal(FILE_NAME),
    [schema.contentUrl.toString()]: rdf.namedNode(CONTENT_URL),
    [schema.dateCreated.toString()]: rdf.literal(Date.now()),
    [schema.isPartOf.toString()]: {
      '@id': parent,
      [dcterms.identifier.toString()]: parent,
      [rdfx.type.toString()]: schema.Thing,
      [schema.name.toString()]: rdf.literal(PARENT_NAME),
    },
  };

  it('renders as Page', async () => {
    const {
      queryByLabelText,
      queryByText,
      queryByTitle,
    } = await renderLinked(
      ({ iri }) => (
        <Page>
          <Resource
            forceRender
            subject={iri}
          />
        </Page>
      ),
      { resources },
    );

    expect(queryByText(PARENT_NAME)).toBeVisible();
    expect(queryByText(FILE_NAME)).toBeVisible();
    expect(queryByTitle('Downloaden')).toHaveProperty('href', `${CONTENT_URL}?download=true`);
    expect(queryByLabelText(FILE_NAME)).toHaveProperty('src', CONTENT_URL);
  });
});
