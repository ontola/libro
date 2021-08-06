import { isNamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import TabbarProvider from '../../components/TabbarProvider';
import app from '../../ontology/app';
import ontola from '../../ontology/ontola';
import { CardMain } from '../../topologies/Card';
import Container from '../../topologies/Container';
import { fullResourceTopology } from '../../topologies/FullResource';

import { MenuTypes } from './types';

interface MenuItemFullProps {
  isPartOf: SomeNode;
}

const MenuItemFull: FC<MenuItemFullProps> = ({
  isPartOf,
  subject,
}) => {
  if (!isNamedNode(subject)) {
    return null;
  }

  return (
    <TabbarProvider
      redirect
      menu={subject}
    >
      <Container>
        <CardMain>
          {isPartOf
            ? <Property label={schema.isPartOf} />
            : (
              <CardContent>
                <Property label={schema.name} />
              </CardContent>
            )}
          <Property
            forceRender
            label={app.menuTabs}
          />
        </CardMain>
      </Container>
      <Property
        forceRender
        label={app.currentTab}
      />
    </TabbarProvider>
  );
};

MenuItemFull.type = MenuTypes;

MenuItemFull.topology = fullResourceTopology;

MenuItemFull.mapDataToProps = {
  isPartOf: schema.isPartOf,
  parentMenu: ontola.parentMenu,
};

export default register(MenuItemFull);
