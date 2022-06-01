/**
 * @jest-environment jsdom
 */

import rdf from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import {
  fireEvent,
  waitFor,
  within,
} from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { wait } from '@testing-library/user-event/dist/utils';
import { Resource } from 'link-redux';
import React from 'react';

import { renderLinked } from '../../../../../tests/test-utils';
import app from '../../../../ontology/app';
import ontola from '../../../../ontology/ontola';
import AppMenu, { AppMenuChildProps } from '../../../../topologies/AppMenu';

describe('MenuItem', () => {
  const menuIRI = app.ns('menus/user');

  const resources = {
    '@id': menuIRI.value,
    [rdfx.type.toString()]: rdfx.Seq,
    [schema.name.toString()]: rdf.literal('Maarten van Scharendrecht'),
    [schema.isPartOf.toString()]: rdf.namedNode('https://argu.dev/menu_items'),
    [rdfx.ns('_0').toString()]: {
      '@id': app.ns('menus/user#show'),
      [rdfx.type.toString()]: ontola.MenuItem,
      [schema.name.toString()]: rdf.literal('Gebruiker weergeven'),
      [ontola.href.toString()]: rdf.namedNode('https://argu.dev/u/maartenvscharendrecht'),
      [schema.isPartOf.toString()]: rdf.namedNode('https://argu.dev/menus/user'),
      [schema.image.toString()]: rdf.namedNode('http://fontawesome.io/icon/user'),
      [ontola.parentMenu.toString()]: menuIRI,
    },
    [rdfx.ns('_1').toString()]: {
      '@id': app.ns('menus/user#profile'),
      [rdfx.type.toString()]: ontola.MenuItem,
      [schema.name.toString()]: rdf.literal('Profiel bewerken'),
      [ontola.href.toString()]: rdf.namedNode('https://argu.dev/settings?tab=profile'),
      [schema.isPartOf.toString()]: rdf.namedNode('https://argu.dev/menus/user'),
      [schema.image.toString()]: rdf.namedNode('http://fontawesome.io/icon/pencil'),
      [ontola.parentMenu.toString()]: menuIRI,
    },
    [rdfx.ns('_2').toString()]: {
      '@id': app.ns('menus/user#settings'),
      [rdfx.type.toString()]: ontola.MenuItem,
      [schema.name.toString()]: rdf.literal('Gebruikersinstellingen'),
      [ontola.href.toString()]: rdf.namedNode('https://argu.dev/settings'),
      [schema.isPartOf.toString()]: rdf.namedNode('https://argu.dev/menus/user'),
      [schema.image.toString()]: rdf.namedNode('http://fontawesome.io/icon/gear'),
      [ontola.parentMenu.toString()]: menuIRI,
    },
  };

  const renderMenu = () => renderLinked((
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
        {({ handleClose }: AppMenuChildProps) => (
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
    await wait();

    expect(getByText('Gebruiker weergeven')).toBeVisible();
  });

  it('closes the menu on click outside', async () => {
    const screen = await renderMenu();

    const trigger = screen.getByText('Menu Trigger');

    fireEvent.click(trigger);
    await wait();

    await waitFor(() => {
      fireEvent.click(document.querySelector('div[data-test="outside"]')!);
    });

    expect(screen.getByText('Gebruiker weergeven')).not.toBeVisible();
  });

  it('closes the menu on menu item click', async () => {
    const { getByText, findByText } = await renderMenu();

    const trigger = getByText('Menu Trigger');
    fireEvent.click(trigger);
    await wait();

    await waitFor(() => {
      findByText('Gebruiker weergeven')
        .then((menuItem) => {
          fireEvent.click(menuItem);
        });
    });

    expect(getByText('Gebruiker weergeven')).not.toBeVisible();
  });

  it('is navigable by keyboard', async () => {
    const { getByText } = await renderMenu();

    const trigger = getByText('Menu Trigger');
    trigger.focus();

    userEvent.keyboard('{enter}{arrowdown}{arrowdown}');

    const menuItem = document.activeElement as HTMLElement;

    expect(menuItem.getAttribute('role')).toBe('menuitem');
    expect(within(menuItem).getByText('Profiel bewerken')).toBeVisible();
  });
});
