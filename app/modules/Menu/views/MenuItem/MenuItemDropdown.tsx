import * as schema from '@ontologies/schema';
import {
  Property,
  Resource,
  array,
  register,
  useGlobalIds,
  useIds,
  useLRS,
  useStrings,
} from 'link-redux';
import React, { MouseEventHandler } from 'react';
import FontAwesome from 'react-fontawesome';

import {
  cardFloatTopology,
  containerFloatTopology,
  contentDetailsTopology,
} from '../../../Common/topologies';
import ResourceBoundary from '../../../Common/components/ResourceBoundary';
import ontola from '../../../Kernel/ontology/ontola';
import TriggerButton, { Trigger } from '../../components/DropdownMenu/TriggerButton';
import Menu from '../../topologies/Menu';

import { MenuTypes } from './types';

const trigger: Trigger = (props) => (
  <TriggerButton {...props}>
    <Property label={schema.image} />
  </TriggerButton>
);

const MenuItemDropdown = () => {
  const lrs = useLRS();
  const items = useIds(array(ontola.menuItems));
  const [action] = useGlobalIds(ontola.action);
  const [name] = useStrings(schema.name);
  const [loading, setLoading] = React.useState(false);
  const actionHandler = React.useCallback<MouseEventHandler>((e) => {
    if (e) {
      e.preventDefault();
    }

    setLoading(true);

    return lrs.exec(action!).then(() => setLoading(false));
  }, [action]);

  if (items.length == 0) {
    return (
      <TriggerButton
        title={name}
        onClick={actionHandler}
      >
        {loading ? (
          <FontAwesome
            spin
            name="spinner"
          />
        ) : <Property label={schema.image} />}
      </TriggerButton>
    );
  }

  return (
    <ResourceBoundary>
      <Menu
        title={name}
        trigger={trigger}
      >
        {items.map((item) => (
          <Resource
            key={item.value}
            subject={item}
          />
        ))}
      </Menu>
    </ResourceBoundary>
  );
};

MenuItemDropdown.type = MenuTypes;

MenuItemDropdown.topology = [
  cardFloatTopology,
  containerFloatTopology,
  contentDetailsTopology,
];

export default register(MenuItemDropdown);
