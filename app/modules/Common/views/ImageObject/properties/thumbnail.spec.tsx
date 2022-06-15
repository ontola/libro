/**
 * @jest-environment jsdom
 */

import rdf from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import { Property, Resource } from 'link-redux';
import React from 'react';

import { renderLinked } from '../../../../../../tests/test-utils';
import views from '../index';

const resource = rdf.namedNode('http://example.com/image/1');
const description = 'Image label';
const thumbUrl = 'http://www.example.com/1.thumb.png';

const resources = {
  '@id': resource.value,
  [rdfx.type.toString()]: schema.ImageObject,
  [schema.description.toString()]: description,
  [schema.thumbnail.toString()]: rdf.namedNode(thumbUrl),
  [schema.url.toString()]: rdf.namedNode('http://www.example.com/1.png'),
};

describe('thumbnail', () => {
  const renderThumbnail = async () => {
    const view = (
      <Resource subject={resource}>
        <Property
          ariaLabel={description}
          label={schema.thumbnail}
        />
      </Resource>
    );
    const opts = {
      resources,
      views,
    };

    return await renderLinked(view, opts);
  };

  it('renders a thumbnail prop in CardMain', async () => {
    const { getByLabelText } = await renderThumbnail();
    const comp = getByLabelText(description);

    expect(comp).toBeVisible();
  });

  it('uses the thumbnail url', async () => {
    const { getByLabelText } = await renderThumbnail();
    const comp = getByLabelText(description);

    expect(comp).toHaveStyle({
      'background-image': `url(${thumbUrl})`,
    });
  });
});
