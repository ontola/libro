import rdf from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import { fireEvent, waitFor } from '@testing-library/dom';
import { Resource } from 'link-redux';
import React from 'react';

import app from '../../ontology/app';
import ontola from '../../ontology/ontola';
import { cleanup, render } from '../../test-utils';
import AppMenu from '../../topologies/AppMenu';

describe('MenuItem', () => {
  afterAll(cleanup);

  const menuIRI = app.ns('menus/user');

  const resources = {
    '@id': menuIRI.value,
    [rdfx.type]: rdfx.Seq,
    [schema.name]: rdf.literal('Maarten van Scharendrecht'),
    [schema.isPartOf]: rdf.namedNode('https://argu.dev/menu_items'),
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
      <React.Fragment>
        <div data-test="outside">
          Outside
        </div>
        <AppMenu
          trigger={({ onClick, anchorRef }) => (
            <button
              ref={anchorRef}
              type="button"
              onClick={onClick}
            >
              Menu Trigger
            </button>
          )}
        >
          {({ handleClose }) => (
            <Resource
              childProps={{
                handleClose,
                hideIcon: true,
              }}
              subject={menuIRI}
            />
          )}
        </AppMenu>
      </React.Fragment>
    ), { resources });

    it('opens the menu on click', async () => {
      const { getByText } = await renderMenu();

      const trigger = getByText('Menu Trigger');

      fireEvent.click(trigger);

      waitFor(() => expect(getByText('Gebruiker weergeven')).toBeVisible());
    });

    it('closes the menu on click outside', async () => {
      const screen = await renderMenu();

      const trigger = screen.getByText('Menu Trigger');

      fireEvent.click(trigger);

      waitFor(() => {
        fireEvent.click(document.querySelector('div[data-test="outside"]'));
        expect(screen.getByText('Gebruiker weergeven')).not.toBeVisible();
      });
    });

    it('closes the menu on menu item click', async () => {
      const { getByText, findByText } = await renderMenu();

      const trigger = getByText('Menu Trigger');
      fireEvent.click(trigger);

      await waitFor(() => {
        findByText('Gebruiker weergeven')
          .then((menuItem) => {
            fireEvent.click(menuItem);
          });
      });

      waitFor(() => expect(getByText('Gebruiker weergeven')).not.toBeVisible());
    });

    it('is navigatable by keyboard', async () => {
      const { getByText } = await renderMenu();

      const trigger = getByText('Menu Trigger');
      trigger.focus();

      fireEvent.keyDown(document.activeElement, {
        code: 'Enter',
        key: 'Enter',
      });

      waitFor(() => {
        fireEvent.keyDown(document.activeElement, {
          code: 'ArrowDown',
          key: 'ArrowDown',
        });

        expect(getByText('Profiel bewerken').hasFocus()).toBe(true);
      });

    });
  });
});
