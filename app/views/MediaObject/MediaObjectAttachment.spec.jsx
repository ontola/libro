import rdf from '@ontologies/core';
import rdfx from '@ontologies/rdf';
import schema from '@ontologies/schema';
import { Resource } from 'link-redux';
import dcterms from '@ontologies/dcterms';
import React from 'react';

import dbo from '../../ontology/dbo';
import {
  cleanup,
  render,
} from '../../test-utils';
import Card from '../../topologies/Card';

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
    [schema.fileSize]: rdf.literal('100kb'),
    [schema.isPartOf]: {
      '@id': parent,
      [dcterms.identifier]: parent,
      [rdfx.type]: schema.Thing,
      [schema.name]: rdf.literal(PARENT_NAME),
    },
  };

  it('renders as Page', () => {
    const {
      queryAllByText,
      queryByText,
      queryByTitle,
    } = render(
      ({ iri }) => (
        <Card>
          <Resource forceRender subject={iri} />
        </Card>
      ),
      { resources }
    );

    expect(queryByText(PARENT_NAME)).toBeNull();
    expect(queryByTitle('Back to parent')).toBeNull();
    /* eslint-disable-next-line no-magic-numbers */
    expect(queryAllByText(FILE_NAME)).toHaveLength(1);
    expect(queryByTitle('Downloaden')).toHaveProperty('href', `${CONTENT_URL}`);
  });
});
