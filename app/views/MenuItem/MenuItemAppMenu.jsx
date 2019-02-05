import {
  register,
  Property,
  linkType,
  withLRS,
  lrsType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { Resource } from '../../components';
import LDLink, { LDLinkLabel } from '../../components/LDLink';
import { NS } from '../../helpers/LinkedRenderStore';
import { appMenuTopology } from '../../topologies/AppMenu';

const MenuItemAppMenu = ({
  darken,
  href,
  lrs,
  menuItems,
  name,
}) => {
  if (menuItems) {
    return (
      <Resource>
        <Property
          childProps={{ darken }}
          label={NS.argu('menuItems')}
        />
      </Resource>
    );
  }

  return (
    <Resource>
      <LDLink
        data-test="MenuItem-MenuItemLabel"
        features={['padded', darken ? 'highlighted-darken' : 'highlighted-lighten']}
        to={href}
        onClick={() => lrs.exec(NS.app('actions/menu/close'))}
      >
        <LDLinkLabel>
          {name.value}
        </LDLinkLabel>
      </LDLink>
    </Resource>
  );
};

MenuItemAppMenu.type = [
  NS.argu('MenuItem'),
  NS.argu('MenuSection'),
  NS.argu('SubMenu'),
  NS.argu('Menu'),
];

MenuItemAppMenu.mapDataToProps = [
  NS.argu('href'),
  NS.argu('menuItems'),
  NS.schema('name'),
];

MenuItemAppMenu.topology = appMenuTopology;

MenuItemAppMenu.hocs = [withLRS];

MenuItemAppMenu.propTypes = {
  darken: PropTypes.bool,
  href: linkType,
  lrs: lrsType,
  menuItems: linkType,
  name: linkType,
};

export default register(MenuItemAppMenu);
