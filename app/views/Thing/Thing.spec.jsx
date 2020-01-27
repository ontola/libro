import rdf from '@ontologies/core';
import rdfx from '@ontologies/rdf';
import schema from '@ontologies/schema';
import { Resource } from 'link-redux';
import dcterms from '@ontologies/dcterms';
import React from 'react';

import {
  cleanup,
  render,
  waitForElementToBeRemoved,
} from '../../test-utils';
import BreadcrumbsBar from '../../components/Breadcrumbs/BreadcrumbsBar';
import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import Card from '../../topologies/Card';
import CardList from '../../topologies/Card/CardList';
import Container from '../../topologies/Container';
import { Page } from '../../topologies/Page';

describe('Thing', () => {
  afterAll(cleanup);

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
    [dcterms.identifier]: resource,
    [rdfx.type]: schema.Thing,
    [schema.name]: rdf.literal(RESOURCE_NAME),
    [schema.text]: rdf.literal(RESOURCE_TEXT),
    [schema.isPartOf]: {
      '@id': parent,
      [dcterms.identifier]: parent,
      [rdfx.type]: schema.Thing,
      [schema.name]: rdf.literal(PARENT_NAME),
    },
    [ontola.coverPhoto]: {
      '@id': coverPhoto,
      [rdfx.type]: schema.ImageObject,
      [schema.thumbnail]: rdf.namedNode('http://example.com/image/1.ico'),
      [schema.url]: rdf.namedNode(contentUrl),
      [schema.contentUrl]: rdf.namedNode(contentUrl),
      [argu.url]: rdf.namedNode(contentUrl),
      [ontola.imgUrl1500x2000]: rdf.namedNode(coverUrl),
      [ontola.imgUrl568x400]: rdf.namedNode(boxUrl),
      [schema.dateCreated]: rdf.literal(Date.now()),
      [ontola.imagePositionY]: rdf.literal(imagePositionY),
    },
  };

  const renderAs = (Topology) => render(
    ({ iri }) => (
      <Topology>
        <Resource forceRender subject={iri} />
      </Topology>
    ),
    { resources }
  );

  it('renders as Page', async () => {
    const {
      queryAllByTestId,
      queryByText,
      queryByTestId,
    } = renderAs(Page);
    await waitForElementToBeRemoved(() => queryAllByTestId('spinner'));

    expect(queryByText(RESOURCE_NAME)).toBeVisible();
    expect(queryByText(RESOURCE_TEXT)).toBeVisible();
    expect(queryByText(PARENT_NAME)).toBeVisible();
    expect(queryByTestId('coverImage')).toHaveStyle(`
      background-image: url(${coverUrl}); 
      background-position-y: ${imagePositionY}%;
    `);
  });

  it('renders as Container', async () => {
    const {
      queryByText,
      queryByTestId,
    } = renderAs(Container);
    expect(queryByText(RESOURCE_NAME)).toBeVisible();
    expect(queryByText(RESOURCE_TEXT)).toBeVisible();
    expect(queryByTestId('coverImage')).toHaveStyle(`
      background-image: url(${boxUrl}); 
      background-position-y: ${imagePositionY}%;
    `);
  });

  it('renders as Card', () => {
    const {
      queryByText,
    } = renderAs(Card);

    expect(queryByText(RESOURCE_NAME)).toBeVisible();
    expect(queryByText(RESOURCE_TEXT)).toBeVisible();
    expect(queryByText(PARENT_NAME)).toBeNull();
  });

  it('renders as CardList', () => {
    const {
      queryAllByText,
      queryByText,
    } = renderAs(CardList);

    /* eslint-disable-next-line no-magic-numbers */
    expect(queryAllByText(RESOURCE_NAME)).toHaveLength(2);
    expect(queryByText(RESOURCE_TEXT)).toBeNull();
    expect(queryByText(PARENT_NAME)).toBeNull();
  });

  it('renders as BreadcrumbsBar', () => {
    const {
      queryByText,
    } = renderAs(BreadcrumbsBar);

    expect(queryByText(RESOURCE_NAME)).toBeVisible();
    expect(queryByText(RESOURCE_TEXT)).toBeNull();
    expect(queryByText(PARENT_NAME)).toBeVisible();
  });
});
