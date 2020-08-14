import Tab from '@material-ui/core/Tab';
import schema from '@ontologies/schema';
import {
  Property,
  Resource,
  register,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { tabBarTopology } from '../../topologies/TabBar';

import { MenuTypes } from './types';

const MenuItemTab = ({ subject, onClick }) => (
  <Tab
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
    onChange={onClick}
  />
);

MenuItemTab.type = MenuTypes;

MenuItemTab.topology = tabBarTopology;

MenuItemTab.mapDataToProps = {
  name: schema.name,
};

MenuItemTab.propTypes = {
  onClick: PropTypes.func,
  subject: subjectType,
};

export default register(MenuItemTab);
