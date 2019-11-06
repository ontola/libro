import rdf from '@ontologies/core';
import schema from '@ontologies/schema';
import { LinkedResourceContainer } from 'link-redux';
import dcterms from '@ontologies/dcterms';
import React from 'react';

import { NS } from '../../../tests';
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
    [NS.rdf('type')]: NS.schema('MediaObject'),
    [NS.schema('encodingFormat')]: rdf.literal('image/png'),
    [NS.dbo('filename')]: rdf.literal(FILE_NAME),
    [NS.schema('contentUrl')]: rdf.namedNode(CONTENT_URL),
    [NS.schema('dateCreated')]: rdf.literal(Date.now()),
    [NS.schema('isPartOf')]: {
      '@id': parent,
      [dcterms.identifier]: parent,
      [NS.rdf('type')]: schema.Thing,
      [NS.schema('name')]: rdf.literal(PARENT_NAME),
    },
  };

  it('renders as Page', () => {
    const {
      queryAllByText,
      queryByAltText,
      queryByText,
      queryByTitle,
    } = render(
      ({ iri }) => (
        <Page>
          <LinkedResourceContainer forceRender subject={iri} />
        </Page>
      ),
      { resources }
    );

    expect(queryByText(PARENT_NAME)).toBeNull();
    expect(queryByTitle('Back to parent')).toBeVisible();
    /* eslint-disable-next-line no-magic-numbers */
    expect(queryAllByText(FILE_NAME)).toHaveLength(2);
    expect(queryByTitle('Downloaden')).toHaveProperty('href', `${CONTENT_URL}?download=true`);
    expect(queryByAltText(FILE_NAME)).toHaveProperty('src', CONTENT_URL);
  });
});
