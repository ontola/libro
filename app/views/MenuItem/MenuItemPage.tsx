import { Resource, register } from 'link-redux';
import React from 'react';

import HeadingContext from '../../components/Heading/HeadingContext';
import Metadata from '../../components/Metadata';
import FullResource from '../../topologies/FullResource';
import { pageTopology } from '../../topologies/Page';

import { MenuTypes } from './types';

const MenuItemPage = (props: any): JSX.Element => (
  <HeadingContext>
    <Metadata />
    <FullResource>
      <main role="main">
        <Resource {...props} />
      </main>
    </FullResource>
  </HeadingContext>
);

MenuItemPage.type = MenuTypes;

MenuItemPage.topology = pageTopology;

export default register(MenuItemPage);
