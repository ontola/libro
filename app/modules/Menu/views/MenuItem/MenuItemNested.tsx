import { isNamedNode } from '@ontologies/core';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import app from '../../../../ontology/app';
import { containerTopology } from '../../../../topologies';
import { CardMain } from '../../../../topologies/Card';
import Container from '../../../../topologies/Container';
import TabbarProvider from '../../../Common/components/TabbarProvider';

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
