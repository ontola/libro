import { isNamedNode } from '@ontologies/core';
import {
  FC,
  Property,
  register, 
} from 'link-redux';
import React from 'react';

import TabbarProvider from '../../../Common/components/TabbarProvider';
import { CardMain } from '../../../Common/topologies/Card';
import Container, { containerTopology } from '../../../Common/topologies/Container';
import app from '../../../Core/ontology/app';

import { MenuTypes } from './types';

const MenuItemNested: FC = ({
  subject,
}) => {
  if (!isNamedNode(subject)) {
    return null;
  }

  return (
    <TabbarProvider menu={subject}>
      <Container>
        <CardMain>
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

MenuItemNested.type = MenuTypes;

MenuItemNested.topology = containerTopology;

export default register(MenuItemNested);
