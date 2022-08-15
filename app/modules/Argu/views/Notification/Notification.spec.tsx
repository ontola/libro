/**
 * @jest-environment jsdom
 */

import rdf from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import { act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchMock from 'jest-fetch-mock';
import { DataObject } from 'link-lib';
import { Resource } from 'link-redux';
import React from 'react';

import { renderLinked } from '../../../../../tests/test-utils';
import hydra from '../../../../ontology/hydra';
import Container from '../../../Common/topologies/Container';
import ld from '../../../Kernel/ontology/ld';
import ontola from '../../../Kernel/ontology/ontola';
import argu from '../../ontology/argu';

describe('Notification', () => {
  afterEach(fetchMock.resetMocks);

  const resource = rdf.namedNode('https://app.argu.co/freetown/n/35464');
  const readResource = rdf.namedNode('https://app.argu.co/freetown/n/19314');

  const NOTIFICATION_TEXT = 'Maarten Scharendrecht heeft een idee geplaatst in Argu Intern';
  const MARK_AS_READ_TEXT = 'Markeer als gelezen';

  const person = {
    '@id': rdf.namedNode('https://app.argu.co/freetown/u/1'),
    [rdfx.type.toString()]: schema.Person,
    [schema.name.toString()]: rdf.literal('Maarten Scharendrecht'),
    [schema.image.toString()]: {
      '@id': rdf.namedNode('https://app.argu.co/freetown/media_objects/825'),
      [rdfx.type.toString()]: schema.ImageObject,
      [schema.dateCreated.toString()]: rdf.literal(new Date('2016-06-01T16:50:02+02:00')),
      [schema.dateModified.toString()]: rdf.literal(new Date('2016-06-01T16:50:02+02:00')),
    },
  };

  const readResources = {
    '@id': readResource.value,
    [rdfx.type.toString()]: argu.Notification,
    [schema.dateCreated.toString()]: rdf.literal(new Date('2017-10-11T17:21:28+02:00')),
    [schema.dateModified.toString()]: rdf.literal(new Date('2017-11-17T11:34:21+01:00')),
    [schema.name.toString()]: rdf.literal(NOTIFICATION_TEXT),
    [schema.target.toString()]: rdf.namedNode('https://app.argu.co/freetown/m/2601'),
    [argu.unread.toString()]: rdf.literal(false),
    [hydra.operation.toString()]: rdf.namedNode('https://app.argu.co/freetown/n/19314/actions/read'),
    [ontola.readAction.toString()]: rdf.namedNode('https://app.argu.co/freetown/n/19314/actions/read'),
    [schema.creator.toString()]: person,
  };

  const unreadResources = {
    '@id': resource.value,
    [rdfx.type.toString()]: argu.Notification,
    [schema.dateCreated.toString()]: rdf.literal(new Date('2017-10-11T17:21:28+02:00')),
    [schema.dateModified.toString()]: rdf.literal(new Date('2017-11-17T11:34:21+01:00')),
    [schema.name.toString()]: rdf.literal(NOTIFICATION_TEXT),
    [schema.target.toString()]: rdf.namedNode('https://app.argu.co/freetown/m/2601'),
    [argu.unread.toString()]: rdf.literal(true),
    [schema.potentialAction.toString()]: rdf.namedNode('https://app.argu.co/freetown/n/19314/actions/read'),
    [ontola.readAction.toString()]: {
      '@id': rdf.namedNode('https://app.argu.co/freetown/n/19314/actions/read'),
      [rdfx.type.toString()]: schema.ReadAction,
      [schema.target.toString()]: {
        '@id': rdf.namedNode('https://app.argu.co/freetown/n/35464/actions/read#EntryPoint'),
        [rdfx.type.toString()]: schema.EntryPoint,
        [schema.httpMethod.toString()]: rdf.literal('PUT'),
        [schema.image.toString()]: rdf.namedNode('http://fontawesome.io/icon/check'),
        [schema.name.toString()]: rdf.literal('Read'),
        [schema.text.toString()]: rdf.literal(''),
        [schema.url.toString()]: rdf.namedNode('https://app.argu.co/freetown/n/19314'),
      },
      [schema.text.toString()]: rdf.literal(''),
      [schema.actionStatus.toString()]: schema.PotentialActionStatus,
      [schema.name.toString()]: rdf.literal(MARK_AS_READ_TEXT),
      [schema.result.toString()]: argu.Notification,
      [schema.object.toString()]: resource,
      [schema.isPartOf.toString()]: resource,
    },
    [schema.creator.toString()]: person,
  };

  describe('in container', () => {
    const renderInContainer = (resources: DataObject) => renderLinked(
      ({ iri }) => (
        <Container>
          <Resource
            forceRender
            subject={iri}
          />
        </Container>
      ),
      { resources },
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

      const delta = `${resource.toString()} ${argu.unread.toString()} "false"^^<http://www.w3.org/2001/XMLSchema#boolean> ${ld.replace.toString()} .`;
      fetchMock.mockResponse(
        delta,
        {
          headers: { 'Content-Type': 'application/n-quads' },
          status: 200,
        },
      );

      expect(fetchMock.mock.calls.length).toEqual(0);
      const notificationText = getByText(NOTIFICATION_TEXT);
      expect(notificationText).toBeVisible();
      expect(getByTitle(MARK_AS_READ_TEXT)).toBeVisible();

      await act(async () => {
        await userEvent.click(notificationText);
      });
      await waitFor(() => expect(fetchMock.mock.calls.length).toEqual(1));
      expect(queryByTitle(MARK_AS_READ_TEXT)).toBeNull();
    });
  });
});
