import {  isNamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import TabbarProvider from '../../components/TabbarProvider';
import app from '../../ontology/app';
import { CardMain } from '../../topologies/Card';
import Container from '../../topologies/Container';
import { fullResourceTopology } from '../../topologies/FullResource';

import { MenuTypes } from './types';

const MenuItemFull: FC = ({ subject }) => {
  const [isPartOf] = useProperty(schema.isPartOf);

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

export default register(MenuItemFull);
