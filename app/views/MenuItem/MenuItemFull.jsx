import schema from '@ontologies/schema';
import {
  Property,
  Resource,
  linkType,
  register,
} from 'link-redux';
import * as PropTypes from 'prop-types';
import React from 'react';

import ontola from '../../ontology/ontola';
import { fullResourceTopology } from '../../topologies/FullResource';
import TabPane from '../../topologies/TabPane';

import useMenuItems from './hooks/useMenuItems';
import { MenuTypes } from './types';

const MenuItemFull = ({
  menuItems: menuItemsIRI,
  topLevel,
}) => {
  const {
    currentTab,
    handleChange,
    items,
  } = useMenuItems(menuItemsIRI, true);

  if (!topLevel) {
    return (
      <TabPane>
        <Property label={ontola.href} />
      </TabPane>
    );
  }

  if (!currentTab) {
    return (
      <Property
        currentTab={currentTab}
        items={items}
        label={schema.isPartOf}
        onChange={handleChange}
      />
    );
  }

  return (
    <React.Fragment>
      <Property
        currentTab={currentTab}
        items={items}
        label={schema.isPartOf}
        onChange={handleChange}
      />
      <Resource
        subject={currentTab}
        topLevel={false}
      />
    </React.Fragment>
  );
};

MenuItemFull.type = MenuTypes;

MenuItemFull.topology = fullResourceTopology;

MenuItemFull.mapDataToProps = {
  dataSubjects: ontola.menuItems,
  menuItems: ontola.menuItems,
  parentMenu: ontola.parentMenu,
};

MenuItemFull.propTypes = {
  location: PropTypes.shape({}),
  menuItems: PropTypes.oneOfType([
    linkType,
    PropTypes.instanceOf(Promise),
  ]),
  topLevel: PropTypes.bool,
};

MenuItemFull.defaultProps = {
  topLevel: true,
};

export default register(MenuItemFull);
