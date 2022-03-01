/**
 * @jest-environment jsdom
 */

import rdf from '@ontologies/core';
import * as dcterms from '@ontologies/dcterms';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import { Resource } from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import { renderLinked } from '../../test-utils';
import BreadcrumbsBar from '../../topologies/BreadcrumbsBar';
import Card from '../../topologies/Card';
import Container from '../../topologies/Container';
import List from '../../topologies/List';
import { Page } from '../../topologies/Page';

describe('Thing', () => {
  const parent = rdf.namedNode('http://example.com/page/1');
  const resource = rdf.namedNode('http://example.com/thing/1');

  const coverPhoto = rdf.namedNode('http://example.com/image/1');
  const imagePositionY = 23;
  const contentUrl = 'http://example.com/image/1.jpg';
  const coverUrl = 'http://example.com/image/cover_1.jpg';
  const boxUrl = 'http://example.com/image/box_1.jpg';

  const RESOURCE_NAME = 'Test item';
  const RESOURCE_TEXT = 'Body text';
  const PARENT_NAME = 'Parent resource';

  const resources = {
    '@id': resource.value,
    [dcterms.identifier.toString()]: resource,
    [rdfx.type.toString()]: schema.Thing,
    [schema.name.toString()]: rdf.literal(RESOURCE_NAME),
    [schema.text.toString()]: rdf.literal(RESOURCE_TEXT),
    [schema.isPartOf.toString()]: {
      '@id': parent,
      [dcterms.identifier.toString()]: parent,
      [rdfx.type.toString()]: schema.Thing,
      [schema.name.toString()]: rdf.literal(PARENT_NAME),
    },
    [ontola.coverPhoto.toString()]: {
      '@id': coverPhoto,
      [rdfx.type.toString()]: schema.ImageObject,
      [schema.thumbnail.toString()]: rdf.namedNode('http://example.com/image/1.ico'),
      [schema.url.toString()]: rdf.namedNode(contentUrl),
      [schema.contentUrl.toString()]: rdf.namedNode(contentUrl),
      [argu.url.toString()]: rdf.namedNode(contentUrl),
      [ontola.imgUrl1500x2000.toString()]: rdf.namedNode(coverUrl),
      [ontola.imgUrl568x400.toString()]: rdf.namedNode(boxUrl),
      [schema.dateCreated.toString()]: rdf.literal(Date.now()),
      [ontola.imagePositionY.toString()]: rdf.literal(imagePositionY),
    },
  };

  const renderAs = (TopologyComp: React.ComponentType<any>) => renderLinked(
    ({ iri }) => (
      <TopologyComp>
        <Resource
          forceRender
          subject={iri}
        />
      </TopologyComp>
    ),
    { resources },
  );

  it('renders as Page', async () => {
    const {
      queryByText,
      queryByTestId,
    } = await renderAs(Page);

    expect(queryByText(RESOURCE_NAME)).toBeVisible();
    expect(queryByText(RESOURCE_NAME)?.tagName).toEqual('H1');
    expect(queryByText(RESOURCE_TEXT)).toBeVisible();
    expect(queryByText(PARENT_NAME)).toBeVisible();
    expect(queryByTestId('CoverPhoto')).toHaveStyle(`
      background-image: url(${coverUrl});
      background-position-y: ${imagePositionY}%;
    `);
  });

  it('renders as Container', async () => {
    const {
      queryByText,
      queryByTestId,
    } = await renderAs(Container);
    expect(queryByText(RESOURCE_NAME)).toBeVisible();
    expect(queryByText(RESOURCE_NAME)?.tagName).toEqual('H1');
    expect(queryByText(RESOURCE_TEXT)).toBeVisible();
    expect(queryByTestId('coverImage')).toHaveStyle(`
      background-image: url(${boxUrl});
      background-position-y: ${imagePositionY}%;
    `);
  });

  it('renders as Card', async () => {
    const {
      queryByText,
    } = await renderAs(Card);

    expect(queryByText(RESOURCE_NAME)).toBeVisible();
    expect(queryByText(RESOURCE_TEXT)).toBeVisible();
    expect(queryByText(PARENT_NAME)).toBeNull();
  });

  it('renders as List', async () => {
    const {
      queryAllByText,
      queryByText,
    } = await renderAs(List);

    /* eslint-disable-next-line @typescript-eslint/no-magic-numbers */
    expect(queryAllByText(RESOURCE_NAME)).toHaveLength(2);
    expect(queryByText(RESOURCE_TEXT)).toBeNull();
    expect(queryByText(PARENT_NAME)).toBeNull();
  });

  it('renders as BreadcrumbsBar', async () => {
    const {
      queryByText,
    } = await renderAs(BreadcrumbsBar);

    expect(queryByText(RESOURCE_NAME)).toBeVisible();
    expect(queryByText(RESOURCE_TEXT)).toBeNull();
    expect(queryByText(PARENT_NAME)).toBeVisible();
  });
});
