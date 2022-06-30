import * as schema from '@ontologies/schema';
import {
  Property,
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import { allTopologies } from '../../../../../topologies';
import { useTabbar } from '../../../../Common/components/TabbarProvider';
import TabPane from '../../../../Common/topologies/TabPane';
import app from '../../../../Core/ontology/app';
import ontola from '../../../../Core/ontology/ontola';

const CurrentTab = () => {
  const { currentTab } = useTabbar();

  if (!currentTab) {
    return null;
  }

  return (
    <Resource subject={currentTab}>
      <TabPane>
        <Property label={schema.text} />
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
