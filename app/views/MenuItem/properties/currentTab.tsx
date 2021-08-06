import * as schema from '@ontologies/schema';
import {
  Property,
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import { useTabbar } from '../../../components/TabbarProvider';
import app from '../../../ontology/app';
import ontola from '../../../ontology/ontola';
import { allTopologies } from '../../../topologies';
import TabPane from '../../../topologies/TabPane';

const CurrentTab = () => {
  const { currentTab } = useTabbar();

  if (!currentTab) {
    return null;
  }

  return (
    <Resource subject={currentTab}>
      <TabPane>
        <Property
          key={currentTab.value}
          label={ontola.href}
        />
      </TabPane>
    </Resource>
  );
};

CurrentTab.type = schema.Thing;

CurrentTab.topology = allTopologies;

CurrentTab.property = app.currentTab;

export default register(CurrentTab);
