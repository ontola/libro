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
import dependencies from '../../dependencies';
import dbo from '../../ontology/dbo';
import Card from '../../topologies/Card';

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
    [schema.fileSize.toString()]: rdf.literal('100kb'),
    [schema.isPartOf.toString()]: {
      '@id': parent,
      [dcterms.identifier.toString()]: parent,
      [rdfx.type.toString()]: schema.Thing,
      [schema.name.toString()]: rdf.literal(PARENT_NAME),
    },
  };

  it('renders as Page', async () => {
    const {
      queryAllByText,
      queryByText,
      queryByTitle,
    } = await renderLinked(
      ({ iri }) => (
        <Card>
          <Resource
            forceRender
            subject={iri}
          />
        </Card>
      ),
      {
        modules: dependencies,
        resources,
      },
    );

    expect(queryByText(PARENT_NAME)).toBeNull();
    expect(queryByTitle('Back to parent')).toBeNull();
    /* eslint-disable-next-line @typescript-eslint/no-magic-numbers */
    expect(queryAllByText(FILE_NAME)).toHaveLength(1);
    expect(queryByTitle('Downloaden')).toHaveProperty('href', `${CONTENT_URL}`);
  });
});
