import { LinkedResourceContainer } from 'link-redux';
import { Literal, NamedNode } from 'rdflib';
import React from 'react';

import { NS } from '../../../tests';
import {
  cleanup,
  render,
} from '../../test-utils';
import { Page } from '../../topologies/Page';

describe('MediaObject', () => {
  afterAll(cleanup);

  const resource = new NamedNode('http://example.com/media_objects/1');
  const parent = new NamedNode('http://example.com/page/1');

  const CONTENT_URL = 'http://example.com/media_objects/1.png';
  const FILE_NAME = '1.png';
  const PARENT_NAME = 'Parent resource';

  const resources = {
    '@id': resource.value,
    [NS.rdf('type')]: NS.schema('MediaObject'),
    [NS.schema('encodingFormat')]: new Literal('image/png'),
    [NS.dbo('filename')]: new Literal(FILE_NAME),
    [NS.schema('contentUrl')]: new NamedNode(CONTENT_URL),
    [NS.schema('dateCreated')]: new Literal(Date.now()),
    [NS.schema('isPartOf')]: {
      '@id': parent,
      [NS.dc('identifier')]: parent,
      [NS.rdf('type')]: NS.schema.Thing,
      [NS.schema('name')]: new Literal(PARENT_NAME),
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
