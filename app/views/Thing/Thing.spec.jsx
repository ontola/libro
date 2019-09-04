import { LinkedResourceContainer } from 'link-redux';
import { Literal, NamedNode } from 'rdflib';
import React from 'react';

import { NS } from '../../../tests';
import {
  cleanup,
  render,
} from '../../test-utils';
import BreadcrumbsBar from '../../components/Breadcrumbs/BreadcrumbsBar';
import Card from '../../topologies/Card';
import CardList from '../../topologies/Card/CardList';
import { Page } from '../../topologies/Page';

describe('Thing', () => {
  afterAll(cleanup);

  const parent = new NamedNode('http://example.com/page/1');
  const resource = new NamedNode('http://example.com/thing/1');

  const RESOURCE_NAME = 'Test item';
  const RESOURCE_TEXT = 'Body text';
  const PARENT_NAME = 'Parent resource';

  const resources = {
    '@id': resource.value,
    [NS.dc('identifier')]: resource,
    [NS.rdf('type')]: NS.schema.Thing,
    [NS.schema('name')]: new Literal(RESOURCE_NAME),
    [NS.schema('text')]: new Literal(RESOURCE_TEXT),
    [NS.schema('isPartOf')]: {
      '@id': parent,
      [NS.dc('identifier')]: parent,
      [NS.rdf('type')]: NS.schema.Thing,
      [NS.schema('name')]: new Literal(PARENT_NAME),
    },
  };

  const renderAs = Topology => render(
    ({ iri }) => (
      <Topology>
        <LinkedResourceContainer forceRender subject={iri} />
      </Topology>
    ),
    { resources }
  );

  it('renders as Page', () => {
    const {
      queryByText,
    } = renderAs(Page);

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