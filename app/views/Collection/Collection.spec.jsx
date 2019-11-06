import rdf from '@ontologies/core';
import dcterms from '@ontologies/dcterms';
import { seq } from 'link-lib';
import { LinkedResourceContainer } from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { cleanup, render } from '../../test-utils';
import { Page } from '../../topologies/Page';


describe('Collection', () => {
  afterAll(cleanup);

  const ITEMS = 10;

  const collectionWithPages = NS.app('nederland/q/75/m');
  const collectionWithItems = NS.app('nederland/q/75/m?page=1&type=paginated');
  const memberResource = NS.example('nederland/m/177');

  const resources = {
    [collectionWithItems]: {
      '@id': collectionWithItems,
      [NS.rdf('type')]: [
        NS.as('CollectionPage'),
        NS.ontola('PaginatedView'),
      ],
      [NS.as('items')]: seq([memberResource]),
      [NS.as('totalItems')]: rdf.literal(1),
      [NS.ontola('collectionDisplay')]: NS.ontola('collectionDisplay/default'),
    },
    [collectionWithPages]: {
      '@id': collectionWithPages,
      [NS.rdf('type')]: [
        NS.as('Collection'),
        NS.ontola('Collection'),
      ],
      [NS.as('name')]: rdf.literal('Ideeën'),
      [NS.ontola('iriTemplate')]: rdf.literal('https://argu.localdev/nederland/q/75/m{?filter%5B%5D,page,page_size,type,before,sort%5B%5D}'),
      [NS.schema('isPartOf')]: NS.app('nederland/q/75'),
      [NS.as('totalItems')]: rdf.literal(ITEMS),
      [NS.schema('potentialAction')]: NS.app('nederland/q/75/m/new'),
      [NS.ontola('defaultType')]: rdf.literal('paginated'),
      [NS.ontola('pages')]: collectionWithItems,
      [dcterms.identifier]: NS.app('nederland/q/75/motions'),
      [NS.ontola('createAction')]: NS.app('nederland/q/75/m/new'),
      [NS.schema('url')]: collectionWithPages,
      [NS.ontola('baseCollection')]: NS.app('new_volunteers'),
      [NS.ontola('collectionDisplay')]: NS.ontola('collectionDisplay/default'),
      [NS.ontola('collectionType')]: NS.ontola('collectionType/paginated'),
      [NS.as('first')]: collectionWithItems,
      [NS.as('last')]: NS.app('nederland/q/75/m?page=2&type=paginated'),
    },
    [memberResource]: {
      '@id': memberResource,
      [NS.rdf('type')]: NS.example('TestClass'),
      [NS.schema('name')]: rdf.literal('Member name'),
      [NS.schema('text')]: rdf.literal('Member text'),
    },
  };

  const { getByText } = render((
    <Page>
      <LinkedResourceContainer subject={collectionWithPages} />
    </Page>
  ), { resources });

  it('renders the views', () => {
    expect(getByText('Member name')).toBeVisible();
  });
});
