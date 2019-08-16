import { fireEvent } from '@testing-library/dom';
import { LinkedResourceContainer } from 'link-redux';
import { Literal, NamedNode } from 'rdflib';
import React from 'react';

import {
  cleanup,
  render,
} from '../../test-utils';
import button from '../../themes/common/components/button';
import AppMenu from '../../topologies/AppMenu';
import { NS } from '../../helpers/LinkedRenderStore';

describe('MenuItem', () => {
  afterAll(cleanup);

  const menuIRI = NS.app('menus/user');

  const resources = {
    '@id': menuIRI.value,
    [NS.rdf('type')]: NS.rdf('Seq'),
    [NS.schema('name')]: new Literal('Maarten van Scharendrecht'),
    [NS.schema('isPartOf')]: new NamedNode('https://argu.dev/menus'),
    [NS.rdf('_0')]: {
      '@id': NS.app('menus/user#show'),
      [NS.rdf('type')]: NS.ontola('MenuItem'),
      [NS.schema('name')]: new Literal('Gebruiker weergeven'),
      [NS.ontola('href')]: new NamedNode('https://argu.dev/u/maartenvscharendrecht'),
      [NS.schema('isPartOf')]: new NamedNode('https://argu.dev/menus/user'),
      [NS.schema('image')]: new NamedNode('http://fontawesome.io/icon/user'),
      [NS.ontola('parentMenu')]: menuIRI,
    },
    [NS.rdf('_1')]: {
      '@id': NS.app('menus/user#profile'),
      [NS.rdf('type')]: NS.ontola('MenuItem'),
      [NS.schema('name')]: new Literal('Profiel bewerken'),
      [NS.ontola('href')]: new NamedNode('https://argu.dev/settings?tab=profile'),
      [NS.schema('isPartOf')]: new NamedNode('https://argu.dev/menus/user'),
      [NS.schema('image')]: new NamedNode('http://fontawesome.io/icon/pencil'),
      [NS.ontola('parentMenu')]: menuIRI,
    },
    [NS.rdf('_2')]: {
      '@id': NS.app('menus/user#settings'),
      [NS.rdf('type')]: NS.ontola('MenuItem'),
      [NS.schema('name')]: new Literal('Gebruikersinstellingen'),
      [NS.ontola('href')]: new NamedNode('https://argu.dev/settings'),
      [NS.schema('isPartOf')]: new NamedNode('https://argu.dev/menus/user'),
      [NS.schema('image')]: new NamedNode('http://fontawesome.io/icon/gear'),
      [NS.ontola('parentMenu')]: menuIRI,
    },
  };

  describe('within appMenu', () => {
    const renderMenu = () => render((
      <AppMenu
        trigger={onClick => (
          <button onClick={onClick}>Menu Trigger</button>
        )}
      >
        {({ handleClose, ref }) => (
          <LinkedResourceContainer
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
