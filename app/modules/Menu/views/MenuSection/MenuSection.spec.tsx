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
import ontola from '../../../../ontology/ontola';
import Navbar from '../../../../topologies/Navbar';

import views from './index';

const resource = rdf.namedNode('https://argu.dev/o/1/menus/navigations#forums');
const label = rdf.literal('Forum');

const resources = [
  {
    '@id': resource.value,
    [rdfx.type.toString()]: argu.MenuSection,
    [schema.name.toString()]: rdf.literal('Forum'),
    [schema.isPartOf.toString()]: rdf.namedNode('https://argu.dev/o/1/menus/navigations'),
    [ontola.menuItems.toString()]: [],
  },
];

describe('MenuSection', () => {
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

  it('renders a MenuSection', async () => {
    const { getByTestId } = await renderAs(resource, Navbar);
    expect(getByTestId('MenuSection-menu-section')).toBeVisible();
  });

  it('renders the label', async () => {
    const { getByText } = await renderAs(resource, Navbar);
    expect(getByText(label.value)).toBeVisible();
  });
});
