import rdf from '@ontologies/core';
import rdfx from '@ontologies/rdf';
import schema from '@ontologies/schema';
import { waitForElementToBeRemoved } from '@testing-library/dom';
import { LinkedResourceContainer } from 'link-redux';
import React from 'react';

import { NS } from '../../../tests';
import {
  cleanup,
  fireEvent,
  render,
} from '../../test-utils';
import Container from '../../topologies/Container';


describe('Notification', () => {
  afterEach(fetch.resetMocks);
  afterAll(cleanup);

  const resource = rdf.namedNode('https://app.argu.co/freetown/n/35464');
  const readResource = rdf.namedNode('https://app.argu.co/freetown/n/19314');

  const NOTIFICATION_TEXT = 'Joep Meindertsma heeft een idee geplaatst in Argu Intern';
  const MARK_AS_READ_TEXT = 'Markeer als gelezen';

  const readResources = {
    '@id': readResource.value,
    [NS.rdf('type')]: NS.argu('Notification'),
    [NS.schema('dateCreated')]: rdf.literal(new Date('2017-10-11T17:21:28+02:00')),
    [NS.schema('dateModified')]: rdf.literal(new Date('2017-11-17T11:34:21+01:00')),
    [NS.schema('name')]: rdf.literal(NOTIFICATION_TEXT),
    [NS.schema('target')]: rdf.namedNode('https://app.argu.co/freetown/m/2601'),
    [NS.argu('unread')]: rdf.literal(false),
    [NS.hydra('operation')]: rdf.namedNode('https://app.argu.co/freetown/n/19314/actions/read'),
    [NS.ontola('readAction')]: rdf.namedNode('https://app.argu.co/freetown/n/19314/actions/read'),
    [NS.schema('creator')]: {
      '@id': rdf.namedNode('https://app.argu.co/freetown/u/1'),
      [NS.rdf('type')]: NS.schema('Person'),
      [NS.schema('name')]: rdf.literal('Joep Meindertsma'),
      [NS.schema('image')]: {
        '@id': rdf.namedNode('https://app.argu.co/freetown/media_objects/825'),
        [NS.rdf('type')]: NS.schema('ImageObject'),
        [NS.schema('dateCreated')]: rdf.literal(new Date('2016-06-01T16:50:02+02:00')),
        [NS.schema('dateModified')]: rdf.literal(new Date('2016-06-01T16:50:02+02:00')),
        [NS.schema('url')]: rdf.namedNode('https://app.argu.co/freetown/photos/825/profielfoto_Joep_Meindertsma.jpg'),
        [NS.schema('thumbnail')]: rdf.namedNode('https://argu-logos.s3.amazonaws.com/photos/825/icon_profielfoto_Joep_Meindertsma.jpg'),
      },
    },
  };
  const unreadResources = {
    '@id': resource.value,
    [NS.rdf('type')]: NS.argu('Notification'),
    [NS.schema('dateCreated')]: rdf.literal(new Date('2017-10-11T17:21:28+02:00')),
    [NS.schema('dateModified')]: rdf.literal(new Date('2017-11-17T11:34:21+01:00')),
    [NS.schema('name')]: rdf.literal('Joep Meindertsma heeft een idee geplaatst in Argu Intern'),
    [NS.schema('target')]: rdf.namedNode('https://app.argu.co/freetown/m/2601'),
    [NS.argu('unread')]: rdf.literal(true),
    [NS.schema('potentialAction')]: rdf.namedNode('https://app.argu.co/freetown/n/19314/actions/read'),
    [NS.ontola('readAction')]: {
      '@id': rdf.namedNode('https://app.argu.co/freetown/n/19314/actions/read'),
      [NS.rdf('type')]: NS.schema('ReadAction'),
      [NS.schema('target')]: {
        '@id': rdf.namedNode('https://app.argu.co/freetown/n/35464/actions/read#EntryPoint'),
        [rdfx.type]: schema.EntryPoint,
        [NS.schema('httpMethod')]: rdf.literal('PUT'),
        [NS.schema('image')]: rdf.namedNode('http://fontawesome.io/icon/check'),
        [NS.schema('name')]: rdf.literal('Read'),
        [NS.schema('text')]: rdf.literal(''),
        [NS.schema('url')]: rdf.namedNode('https://app.argu.co/freetown/n/19314'),
      },
      [NS.schema('text')]: rdf.literal(''),
      [NS.schema('actionStatus')]: NS.schema('PotentialActionStatus'),
      [NS.schema('name')]: rdf.literal(MARK_AS_READ_TEXT),
      [NS.schema('result')]: NS.argu('Notification'),
      [NS.schema('object')]: resource,
      [NS.schema('isPartOf')]: resource,
    },
    [NS.schema('creator')]: {
      '@id': rdf.namedNode('https://app.argu.co/freetown/u/1'),
      [rdfx.type]: NS.schema('Person'),
      [NS.schema('name')]: rdf.literal('Joep Meindertsma'),
      [NS.schema('image')]: {
        '@id': rdf.namedNode('https://app.argu.co/freetown/media_objects/825'),
        [rdfx.type]: NS.schema('ImageObject'),
        [NS.schema('dateCreated')]: rdf.literal(new Date('2016-06-01T16:50:02+02:00')),
        [NS.schema('dateModified')]: rdf.literal(new Date('2016-06-01T16:50:02+02:00')),
        [NS.schema('url')]: rdf.namedNode('https://app.argu.co/freetown/photos/825/profielfoto_Joep_Meindertsma.jpg'),
        [NS.schema('thumbnail')]: rdf.namedNode('https://argu-logos.s3.amazonaws.com/photos/825/icon_profielfoto_Joep_Meindertsma.jpg'),
      },
    },
  };

  describe('in container', () => {
    const renderInContainer = resources => render(
      ({ iri }) => (
        <Container>
          <LinkedResourceContainer forceRender subject={iri} />
        </Container>
      ),
      { resources }
    );

    it('renders', () => {
      const {
        getByText,
      } = renderInContainer(readResources);

      expect(getByText(NOTIFICATION_TEXT)).toBeVisible();
    });

    it('has no unread marker when read', () => {
      const {
        getByText,
        queryByTitle,
      } = renderInContainer(readResources);

      const notificationText = getByText(NOTIFICATION_TEXT);
      expect(notificationText).toBeVisible();
      expect(queryByTitle(MARK_AS_READ_TEXT)).toBeNull();
    });

    it('has a unread marker when unread', async () => {
      const {
        getByText,
        getByTitle,
        queryByTitle,
      } = renderInContainer(unreadResources);

      const delta = `${resource.toString()} ${NS.argu('unread').toString()} "false"^^<http://www.w3.org/2001/XMLSchema#boolean> ${NS.ontola('replace').toString()} .`;
      fetch.mockResponse(
        delta,
        {
          headers: { 'Content-Type': 'application/n-quads' },
          status: 200,
        }
      );

      expect(fetch.mock.calls.length).toEqual(0);
      const notificationText = getByText(NOTIFICATION_TEXT);
      expect(notificationText).toBeVisible();
      expect(getByTitle(MARK_AS_READ_TEXT)).toBeVisible();
      fireEvent.click(notificationText);

      await waitForElementToBeRemoved(() => getByTitle(MARK_AS_READ_TEXT));
      expect(fetch.mock.calls.length).toEqual(1);
      expect(queryByTitle(MARK_AS_READ_TEXT)).toBeNull();
    });
  });
});
