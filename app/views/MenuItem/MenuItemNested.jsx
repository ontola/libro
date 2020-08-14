import {
  Property,
  Resource,
  linkType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import app from '../../ontology/app';
import ontola from '../../ontology/ontola';
import { CardMain } from '../../topologies/Card';
import Container, { containerTopology } from '../../topologies/Container';
import TabPane from '../../topologies/TabPane';

import useMenuItems from './hooks/useMenuItems';
import { MenuTypes } from './types';

const MenuItemNested = ({
  menuItems: menuItemsIRI,
  topLevel,
}) => {
  const {
    currentTab,
    handleChange,
    items,
  } = useMenuItems(menuItemsIRI, false);

  let body;
  if (currentTab && topLevel) {
    body = (
      <Resource
        subject={currentTab}
        topLevel={false}
      />
    );
  } else {
    body = (
      <TabPane>
        <Property label={ontola.href} />
      </TabPane>
    );
  }

  return (
    <React.Fragment>
      {topLevel && (
        <Container>
          <CardMain>
            <Property
              forceRender
              currentTab={currentTab}
              items={items}
              label={app.menuTabs}
              onChange={handleChange}
            />
          </CardMain>
        </Container>
      )}
      {body}
    </React.Fragment>
  );
};

MenuItemNested.type = MenuTypes;

MenuItemNested.topology = containerTopology;

MenuItemNested.mapDataToProps = {
  dataSubjects: ontola.menuItems,
  menuItems: ontola.menuItems,
  parentMenu: ontola.parentMenu,
};

MenuItemNested.propTypes = {
  location: PropTypes.shape({}),
  menuItems: PropTypes.oneOfType([
    linkType,
    PropTypes.instanceOf(Promise),
  ]),
  topLevel: PropTypes.bool,
};

MenuItemNested.defaultProps = {
  topLevel: true,
};

export default register(MenuItemNested);
