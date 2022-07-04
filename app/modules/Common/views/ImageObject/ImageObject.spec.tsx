/**
 * @jest-environment jsdom
 */

import rdf, { Node } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import { Resource } from 'link-redux';
import React from 'react';

import { renderLinked } from '../../../../../tests/test-utils';
import argu from '../../../Argu/ontology/argu';
import ontola from '../../../Kernel/ontology/ontola';
import FormFooter from '../../../Form/topologies/FormFooter';
import Navbar from '../../../NavBar/topologies/Navbar';
import { CardMain } from '../../topologies/Card';
import DetailsBar from '../../topologies/DetailsBar';

import views from './index';

const resource = rdf.namedNode('http://example.com/image/1');
const imagePositionY = 23;
const url = 'http://example.com/image/1.jpg';
const coverUrl = 'http://example.com/image/cover_1.jpg';
const thumbnailUrl = 'http://example.com/image/thumb_1.jpg';
const boxUrl = 'http://example.com/image/box_1.jpg';
const description = 'Test image';

const resources = {
  '@id': resource.value,
  [rdfx.type.toString()]: schema.ImageObject,
  [schema.description.toString()]: description,
  [schema.thumbnail.toString()]: rdf.namedNode(thumbnailUrl),
  [schema.url.toString()]: rdf.namedNode(url),
  [schema.contentUrl.toString()]: rdf.namedNode(url),
  [argu.url.toString()]: rdf.namedNode(url),
  [ontola.imgUrl1500x2000.toString()]: rdf.namedNode(coverUrl),
  [ontola.imgUrl568x400.toString()]: rdf.namedNode(boxUrl),
  [schema.dateCreated.toString()]: rdf.literal(Date.now()),
  [ontola.imagePositionY.toString()]: rdf.literal(imagePositionY),
};

describe('ImageObject', () => {
  const renderAs = async (subject: Node, TopologyProvider: React.ComponentType) => {
    const view = (
      <TopologyProvider>
        <Resource subject={subject} />
      </TopologyProvider>
    );
    const opts = {
      resources,
      views,
    };

    return await renderLinked(view, opts);
  };

  it('renders an image in CardMain', async () => {
    const { getByLabelText } = await renderAs(resource, CardMain);
    const comp = getByLabelText(description);

    expect(comp).toBeVisible();
    expect(comp).toHaveAttribute('src', url);
  });

  it('renders an image in DetailsBar', async () => {
    const { getByLabelText } = await renderAs(resource, DetailsBar);
    const comp = getByLabelText(description);

    expect(comp).toBeVisible();
    expect(comp).toHaveStyle({
      'background-image': `url(${thumbnailUrl})`,
    });
  });

  it('renders an box in Navbar', async () => {
    const { getByLabelText } = await renderAs(resource, Navbar);
    const comp = getByLabelText(description);

    expect(comp).toBeVisible();
    expect(comp).toHaveAttribute('src', boxUrl);
  });

  it('renders an image in FormFooter', async () => {
    const { getByTitle } = await renderAs(resource, FormFooter);
    const comp = getByTitle(description);

    expect(comp).toBeVisible();
    expect(comp).toHaveStyle({
      'background-image': `url(${thumbnailUrl})`,
    });
  });
});
