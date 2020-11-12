import schema from '@ontologies/schema';
import {
  Property,
  Resource,
  linkType,
  register,
} from 'link-redux';
import * as PropTypes from 'prop-types';
import React from 'react';

import app from '../../ontology/app';
import ontola from '../../ontology/ontola';
import { CardContent, CardMain } from '../../topologies/Card';
import Container from '../../topologies/Container';
import { fullResourceTopology } from '../../topologies/FullResource';
import TabPane from '../../topologies/TabPane';

import useMenuItems from './hooks/useMenuItems';
import { MenuTypes } from './types';

const MenuItemFull = ({
  isPartOf,
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
    return null;
  }

  return (
    <React.Fragment>
      <Container>
        <CardMain>
          {isPartOf
            ? <Property label={schema.isPartOf} />
            : <CardContent><Property label={schema.name} /> </CardContent>}
          <Property
            forceRender
            currentTab={currentTab}
            items={items}
            label={app.menuTabs}
            onChange={handleChange}
          />
        </CardMain>
      </Container>
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
  isPartOf: schema.isPartOf,
  menuItems: ontola.menuItems,
  parentMenu: ontola.parentMenu,
};

MenuItemFull.propTypes = {
  isPartOf: linkType,
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
