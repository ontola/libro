import IconButton from '@material-ui/core/IconButton';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { isNamedNode } from '@ontologies/core';
import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import {
  Property,
  Resource,
  linkType,
  register,
  useLRS,
  useLinkRenderContext,
} from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import { actionsBarTopology } from '../../topologies/ActionsBar';
import Menu from '../../topologies/Menu';

function normalizeAction(lrs, action) {
  if (isNamedNode(action)) {
    return (e) => {
      e.preventDefault();

      return lrs.exec(action, true);
    };
  }

  return action;
}

const Test = ({
  action,
  menuItems,
  name,
}) => {
  const lrs = useLRS();
  const { subject } = useLinkRenderContext();

  if (menuItems) {
    const trigger = (onClick) => (
      <IconButton
        centerRipple
        color="default"
        size="small"
        onClick={onClick}
      >
        <Property label={schema.image} />
      </IconButton>
    );

    return (
      <Menu
        trigger={trigger}
      >
        <Resource subject={menuItems} />
      </Menu>
    );
  }
  console.log('ToggleButton', subject.value);

  return (
    <ToggleButton
      size="small"
      title={name?.value}
      value={subject.value}
      onClick={normalizeAction(lrs, action)}
    >
      <Property label={schema.image} />
    </ToggleButton>
  );
};

const MenuItemActionsBar = React.forwardRef((props, ref) => <Test {...props} innerRef={ref} />)

MenuItemActionsBar.type = [
  ontola.MenuItem,
  argu.MenuSection,
  argu.SubMenu,
  argu.Menu,
];

MenuItemActionsBar.topology = [actionsBarTopology];

MenuItemActionsBar.mapDataToProps = {
  action: ontola.action,
  menuItems: ontola.menuItems,
  name: [schema.name, rdfs.label],
};

MenuItemActionsBar.propTypes = {
  action: linkType,
  icon: linkType,
  menuItems: linkType,
  name: linkType,
};

export default register(MenuItemActionsBar);
