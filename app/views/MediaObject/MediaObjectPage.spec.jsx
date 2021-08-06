import rdf from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import { Resource } from 'link-redux';
import * as dcterms from '@ontologies/dcterms';
import React from 'react';

import dbo from '../../ontology/dbo';
import {
  cleanup,
  render,
} from '../../test-utils';
import { Page } from '../../topologies/Page';

describe('MediaObject', () => {
  afterAll(cleanup);

  const resource = rdf.namedNode('http://example.com/media_objects/1');
  const parent = rdf.namedNode('http://example.com/page/1');

  const CONTENT_URL = 'http://example.com/media_objects/1.png';
  const FILE_NAME = '1.png';
  const PARENT_NAME = 'Parent resource';

  const resources = {
    '@id': resource.value,
    [rdfx.type]: schema.MediaObject,
    [schema.encodingFormat]: rdf.literal('image/png'),
    [dbo.filename]: rdf.literal(FILE_NAME),
    [schema.contentUrl]: rdf.namedNode(CONTENT_URL),
    [schema.dateCreated]: rdf.literal(Date.now()),
    [schema.isPartOf]: {
      '@id': parent,
      [dcterms.identifier]: parent,
      [rdfx.type]: schema.Thing,
      [schema.name]: rdf.literal(PARENT_NAME),
    },
  };

  it('renders as Page', async () => {
    const {
      queryByLabelText,
      queryByText,
      queryByTitle,
    } = await render(
      ({ iri }) => (
        <Page>
          <Resource
            forceRender
            subject={iri}
          />
        </Page>
      ),
      { resources }
    );

    expect(queryByText(PARENT_NAME)).toBeVisible();
    expect(queryByText(FILE_NAME)).toBeVisible();
    expect(queryByTitle('Downloaden')).toHaveProperty('href', `${CONTENT_URL}?download=true`);
    expect(queryByLabelText(FILE_NAME)).toHaveProperty('src', CONTENT_URL);
  });
});
