import rdf from '@ontologies/core';
import rdfx from '@ontologies/rdf';
import schema from '@ontologies/schema';
import { fireEvent } from '@testing-library/dom';
import { Resource } from 'link-redux';
import React from 'react';

import app from '../../ontology/app';
import ontola from '../../ontology/ontola';
import {
  cleanup,
  render,
} from '../../test-utils';
import button from '../../themes/common/theme/components/button';
import AppMenu from '../../topologies/AppMenu';

describe('MenuItem', () => {
  afterAll(cleanup);

  const menuIRI = app.ns('menus/user');

  const resources = {
    '@id': menuIRI.value,
    [rdfx.type]: rdfx.Seq,
    [schema.name]: rdf.literal('Maarten van Scharendrecht'),
    [schema.isPartOf]: rdf.namedNode('https://argu.dev/menus'),
    [rdfx.ns('_0')]: {
      '@id': app.ns('menus/user#show'),
      [rdfx.type]: ontola.MenuItem,
      [schema.name]: rdf.literal('Gebruiker weergeven'),
      [ontola.href]: rdf.namedNode('https://argu.dev/u/maartenvscharendrecht'),
      [schema.isPartOf]: rdf.namedNode('https://argu.dev/menus/user'),
      [schema.image]: rdf.namedNode('http://fontawesome.io/icon/user'),
      [ontola.parentMenu]: menuIRI,
    },
    [rdfx.ns('_1')]: {
      '@id': app.ns('menus/user#profile'),
      [rdfx.type]: ontola.MenuItem,
      [schema.name]: rdf.literal('Profiel bewerken'),
      [ontola.href]: rdf.namedNode('https://argu.dev/settings?tab=profile'),
      [schema.isPartOf]: rdf.namedNode('https://argu.dev/menus/user'),
      [schema.image]: rdf.namedNode('http://fontawesome.io/icon/pencil'),
      [ontola.parentMenu]: menuIRI,
    },
    [rdfx.ns('_2')]: {
      '@id': app.ns('menus/user#settings'),
      [rdfx.type]: ontola.MenuItem,
      [schema.name]: rdf.literal('Gebruikersinstellingen'),
      [ontola.href]: rdf.namedNode('https://argu.dev/settings'),
      [schema.isPartOf]: rdf.namedNode('https://argu.dev/menus/user'),
      [schema.image]: rdf.namedNode('http://fontawesome.io/icon/gear'),
      [ontola.parentMenu]: menuIRI,
    },
  };

  describe('within appMenu', () => {
    const renderMenu = () => render((
      <AppMenu
        trigger={(onClick) => (
          <button onClick={onClick}>Menu Trigger</button>
        )}
      >
        {({ handleClose, ref }) => (
          <Resource
            childProps={{
              hideIcon: true,
              onClose: handleClose,
              ref,
            }}
            subject={menuIRI}
          />
        )}
      </AppMenu>
    ), { resources });

    it('opens the menu on click', () => {
      const { getByText } = renderMenu();

      const trigger = getByText('Menu Trigger');
      fireEvent.click(trigger);

      expect(getByText('Gebruiker weergeven')).toBeVisible();
    });

    it('closes the menu on click outside', () => {
      const { getByText } = renderMenu();

      const trigger = getByText('Menu Trigger');
      fireEvent.click(trigger);

      fireEvent.click(document.querySelector('div[role="presentation"] div'));

      expect(getByText('Gebruiker weergeven')).not.toBeVisible();
    });

    it('closes the menu on menu item click', () => {
      const { getByText } = renderMenu();

      const trigger = getByText('Menu Trigger');
      fireEvent.click(trigger);

      fireEvent.click(getByText('Gebruiker weergeven'));

      expect(getByText('Gebruiker weergeven')).not.toBeVisible();
    });
  });
});
