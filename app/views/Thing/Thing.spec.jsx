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
import Card from '../../topologies/Card';
import CardList from '../../topologies/Card/CardList';
import { Page } from '../../topologies/Page';

describe('Thing', () => {
  afterAll(cleanup);

  const parent = rdf.namedNode('http://example.com/page/1');
  const resource = rdf.namedNode('http://example.com/thing/1');

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
      queryByText,
      queryAllByTestId,
    } = renderAs(Page);
    await waitForElementToBeRemoved(() => queryAllByTestId('spinner'));

    expect(queryByText(RESOURCE_NAME)).toBeVisible();
    expect(queryByText(RESOURCE_TEXT)).toBeVisible();
    expect(queryByText(PARENT_NAME)).toBeVisible();
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
