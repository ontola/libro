import {
  Property,
  linkType,
  lrsType,
  register,
  withLRS,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { Resource } from '../../components';
import LinkLabel from '../../components/Link/LinkLabel';
import { NS } from '../../helpers/LinkedRenderStore';
import { appMenuTopology } from '../../topologies/AppMenu';

const MenuItemAppMenu = ({
  darken,
  lrs,
  menuItems,
  name,
}) => {
  if (menuItems) {
    return (
      <Resource>
        <Property
          childProps={{ darken }}
          label={NS.ontola('menuItems')}
        />
      </Resource>
    );
  }

  return (
    <Resource>
      <Property
        data-test="MenuItem-MenuItemLabel"
        features={['padded', darken ? 'highlighted-darken' : 'highlighted-lighten']}
        label={NS.ontola('href')}
        onClickToggle={() => lrs.exec(NS.app('actions/menu/close'))}
      >
        <LinkLabel>
          {name.value}
        </LinkLabel>
      </Property>
    </Resource>
  );
};

MenuItemAppMenu.type = [
  NS.ontola('MenuItem'),
  NS.argu('MenuSection'),
  NS.argu('SubMenu'),
  NS.argu('Menu'),
];

MenuItemAppMenu.mapDataToProps = [
  NS.ontola('menuItems'),
  NS.schema('name'),
];

MenuItemAppMenu.topology = appMenuTopology;

MenuItemAppMenu.hocs = [withLRS];

MenuItemAppMenu.propTypes = {
  darken: PropTypes.bool,
  lrs: lrsType,
  menuItems: linkType,
  name: linkType,
};

export default register(MenuItemAppMenu);
