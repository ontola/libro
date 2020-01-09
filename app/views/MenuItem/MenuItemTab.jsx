import Tab from '@material-ui/core/Tab';
import schema from '@ontologies/schema';
import {
  Property,
  Resource,
  register,
  subjectType,
} from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import ontola from '../../ontology/ontola';
import { tabBarTopology } from '../../topologies/TabBar';

const MenuItemTab = ({ subject }) => (
  <Tab
    href={subject.value}
    icon={(
      <Resource subject={subject}>
        <Property label={schema.image} />
      </Resource>
    )}
    key={subject.value}
    label={(
      <Resource subject={subject}>
        <Property label={schema.name} />
      </Resource>
    )}
    value={subject.value}
  />
);

MenuItemTab.type = [
  ontola.MenuItem,
  NS.argu('MenuSection'),
  NS.argu('SubMenu'),
  NS.argu('Menu'),
];

MenuItemTab.topology = tabBarTopology;

MenuItemTab.mapDataToProps = {
  name: schema.name,
};

MenuItemTab.propTypes = {
  subject: subjectType,
};

export default register(MenuItemTab);
