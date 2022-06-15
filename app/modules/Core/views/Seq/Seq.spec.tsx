/**
 * @jest-environment jsdom
 */

import rdf, { createNS } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import { Resource } from 'link-redux';
import React from 'react';

import { renderLinked } from '../../../../../tests/test-utils';
import example from '../../../../ontology/example';
import ontola from '../../../../ontology/ontola';
import { CardRow } from '../../../../topologies/Card';
import menuItemCardRowViews from '../../../Menu/views/MenuItem/MenuItemCardRow';

import views from './index';

const resource = example.ns('resource');

const testNS = createNS('https://argu.dev/');

const ordered = [
  'Entry Over Argu',
  'Entry Ons team',
  'Entry Argu voor overheden',
  'Entry Pers & media',
  'Entry Help & support',
  'Entry Contact',
];

const resources = [
  {
    '@id': resource.value,
    [rdfx.type.toString()]: rdfx.Seq,
    [rdfx.ns('_5').toString()]: testNS('menus/info#contact'),
    [rdfx.ns('_2').toString()]: testNS('menus/info#governments'),
    [rdfx.ns('_0').toString()]: testNS('menus/info#about'),
    [rdfx.ns('_3').toString()]: testNS('menus/info#press_media'),
    [rdfx.ns('_4').toString()]: testNS('menus/info#support'),
    [rdfx.ns('_1').toString()]: testNS('menus/info#team'),
  },
  {
    '@id': testNS('menus/info#about').value,
    [rdfx.type.toString()]: ontola.MenuItem,
    [schema.isPartOf.toString()]: testNS('menus/info'),
    [ontola.href.toString()]: rdf.namedNode('https://argu.dev/i/about'),
    [schema.name.toString()]: rdf.literal('Entry Over Argu'),
  },
  {
    '@id': testNS('menus/info#team').value,
    [rdfx.type.toString()]: ontola.MenuItem,
    [schema.isPartOf.toString()]: testNS('menus/info'),
    [ontola.href.toString()]: rdf.namedNode('https://argu.dev/i/team'),
    [schema.name.toString()]: rdf.literal('Entry Ons team'),
  },
  {
    '@id': testNS('menus/info#governments').value,
    [rdfx.type.toString()]: ontola.MenuItem,
    [schema.isPartOf.toString()]: testNS('menus/info'),
    [ontola.href.toString()]: rdf.namedNode('https://argu.dev/i/governments'),
    [schema.name.toString()]: rdf.literal('Entry Argu voor overheden'),
  },
  {
    '@id': testNS('menus/info#press_media').value,
    [rdfx.type.toString()]: ontola.MenuItem,
    [schema.isPartOf.toString()]: testNS('menus/info'),
    [ontola.href.toString()]: rdf.namedNode('https://argu.pr.co'),
    [schema.name.toString()]: rdf.literal('Entry Pers & media'),
  },
  {
    '@id': testNS('menus/info#support').value,
    [rdfx.type.toString()]: ontola.MenuItem,
    [schema.isPartOf.toString()]: testNS('menus/info'),
    [ontola.href.toString()]: rdf.namedNode('https://argu.freshdesk.com/support/home'),
    [schema.name.toString()]: rdf.literal('Entry Help & support'),
  },
  {
    '@id': testNS('menus/info#contact').value,
    [rdfx.type.toString()]: ontola.MenuItem,
    [schema.isPartOf.toString()]: testNS('menus/info'),
    [ontola.href.toString()]: rdf.namedNode('https://argu.dev/i/contact'),
    [schema.name.toString()]: rdf.literal('Entry Contact'),
  },
];

describe('Seq', () => {
  const renderAs = async () => {
    const view = (
      <CardRow>
        <Resource subject={resource} />
      </CardRow>
    );
    const opts = {
      resources,
      views: [...views, ...menuItemCardRowViews],
    };

    return await renderLinked(view, opts);
  };

  it('renders the members', async () => {
    const { getByText } = await renderAs();

    const titles = resources
      .slice(1)
      .map((it) => it[schema.name.toString()].value);

    expect(titles).toHaveLength(resources.length - 1);
    titles.forEach((name) => {
      expect(getByText(name)).toBeVisible();
    });
  });

  it('orders its data', async () => {
    const { getAllByText } = await renderAs();
    const elements = getAllByText('Entry', { exact: false });

    for (let i = 0; i < ordered.length; i++) {
      expect(elements[i]).toBeVisible();
      expect(elements[i]).toHaveTextContent(ordered[i]);
    }
  });
});

