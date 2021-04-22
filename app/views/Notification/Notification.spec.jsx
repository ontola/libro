import rdf from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import { waitForElementToBeRemoved } from '@testing-library/dom';
import { Resource } from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import hydra from '../../ontology/hydra';
import ontola from '../../ontology/ontola';
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
    [rdfx.type]: argu.Notification,
    [schema.dateCreated]: rdf.literal(new Date('2017-10-11T17:21:28+02:00')),
    [schema.dateModified]: rdf.literal(new Date('2017-11-17T11:34:21+01:00')),
    [schema.name]: rdf.literal(NOTIFICATION_TEXT),
    [schema.target]: rdf.namedNode('https://app.argu.co/freetown/m/2601'),
    [argu.unread]: rdf.literal(false),
    [hydra.operation]: rdf.namedNode('https://app.argu.co/freetown/n/19314/actions/read'),
    [ontola.readAction]: rdf.namedNode('https://app.argu.co/freetown/n/19314/actions/read'),
    [schema.creator]: {
      '@id': rdf.namedNode('https://app.argu.co/freetown/u/1'),
      [rdfx.type]: schema.Person,
      [schema.name]: rdf.literal('Joep Meindertsma'),
      [schema.image]: {
        '@id': rdf.namedNode('https://app.argu.co/freetown/media_objects/825'),
        [rdfx.type]: schema.ImageObject,
        [schema.dateCreated]: rdf.literal(new Date('2016-06-01T16:50:02+02:00')),
        [schema.dateModified]: rdf.literal(new Date('2016-06-01T16:50:02+02:00')),
        [schema.url]: rdf.namedNode('https://app.argu.co/freetown/photos/825/profielfoto_Joep_Meindertsma.jpg'),
        [schema.thumbnail]: rdf.namedNode('https://argu-logos.s3.amazonaws.com/photos/825/icon_profielfoto_Joep_Meindertsma.jpg'),
      },
    },
  };
  const unreadResources = {
    '@id': resource.value,
    [rdfx.type]: argu.Notification,
    [schema.dateCreated]: rdf.literal(new Date('2017-10-11T17:21:28+02:00')),
    [schema.dateModified]: rdf.literal(new Date('2017-11-17T11:34:21+01:00')),
    [schema.name]: rdf.literal('Joep Meindertsma heeft een idee geplaatst in Argu Intern'),
    [schema.target]: rdf.namedNode('https://app.argu.co/freetown/m/2601'),
    [argu.unread]: rdf.literal(true),
    [schema.potentialAction]: rdf.namedNode('https://app.argu.co/freetown/n/19314/actions/read'),
    [ontola.readAction]: {
      '@id': rdf.namedNode('https://app.argu.co/freetown/n/19314/actions/read'),
      [rdfx.type]: schema.ReadAction,
      [schema.target]: {
        '@id': rdf.namedNode('https://app.argu.co/freetown/n/35464/actions/read#EntryPoint'),
        [rdfx.type]: schema.EntryPoint,
        [schema.httpMethod]: rdf.literal('PUT'),
        [schema.image]: rdf.namedNode('http://fontawesome.io/icon/check'),
        [schema.name]: rdf.literal('Read'),
        [schema.text]: rdf.literal(''),
        [schema.url]: rdf.namedNode('https://app.argu.co/freetown/n/19314'),
      },
      [schema.text]: rdf.literal(''),
      [schema.actionStatus]: schema.PotentialActionStatus,
      [schema.name]: rdf.literal(MARK_AS_READ_TEXT),
      [schema.result]: argu.Notification,
      [schema.object]: resource,
      [schema.isPartOf]: resource,
    },
    [schema.creator]: {
      '@id': rdf.namedNode('https://app.argu.co/freetown/u/1'),
      [rdfx.type]: schema.Person,
      [schema.name]: rdf.literal('Joep Meindertsma'),
      [schema.image]: {
        '@id': rdf.namedNode('https://app.argu.co/freetown/media_objects/825'),
        [rdfx.type]: schema.ImageObject,
        [schema.dateCreated]: rdf.literal(new Date('2016-06-01T16:50:02+02:00')),
        [schema.dateModified]: rdf.literal(new Date('2016-06-01T16:50:02+02:00')),
        [schema.url]: rdf.namedNode('https://app.argu.co/freetown/photos/825/profielfoto_Joep_Meindertsma.jpg'),
        [schema.thumbnail]: rdf.namedNode('https://argu-logos.s3.amazonaws.com/photos/825/icon_profielfoto_Joep_Meindertsma.jpg'),
      },
    },
  };

  describe('in container', async () => {
    const renderInContainer = (resources) => render(
      ({ iri }) => (
        <Container>
          <Resource forceRender subject={iri} />
        </Container>
      ),
      { resources }
    );

    it('renders', async () => {
      const {
        getByText,
      } = await renderInContainer(readResources);

      expect(getByText(NOTIFICATION_TEXT)).toBeVisible();
    });

    it('has no unread marker when read', async () => {
      const {
        getByText,
        queryByTitle,
      } = await renderInContainer(readResources);

      const notificationText = getByText(NOTIFICATION_TEXT);
      expect(notificationText).toBeVisible();
      expect(queryByTitle(MARK_AS_READ_TEXT)).toBeNull();
    });

    it('has a unread marker when unread', async () => {
      const {
        getByText,
        getByTitle,
        queryByTitle,
      } = await renderInContainer(unreadResources);

      const delta = `${resource.toString()} ${argu.unread.toString()} "false"^^<http://www.w3.org/2001/XMLSchema#boolean> ${ontola.replace.toString()} .`;
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
