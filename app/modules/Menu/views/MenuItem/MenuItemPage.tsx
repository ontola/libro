import { Resource, register } from 'link-redux';
import React from 'react';

import { pageTopology } from '../../../../topologies';
import FullResource from '../../../../topologies/FullResource';
import HeadingContext from '../../../Common/components/Heading/HeadingContext';
import Metadata from '../../../Common/components/Metadata';

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
