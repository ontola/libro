import IconButton from '@material-ui/core/IconButton';
import * as as from '@ontologies/as';
import { SomeTerm } from '@ontologies/core';
import {
  FC,
  Resource,
  register,
  useProperty,
} from 'link-redux';
import React, { MouseEventHandler } from 'react';
import FontAwesome from 'react-fontawesome';

import ontola from '../../../ontology/ontola';
import { allTopologies } from '../../../topologies';
import Menu from '../../../topologies/Menu';

interface FilterFieldsProps {
  linkedProp: SomeTerm;
}

const trigger = (onClick: MouseEventHandler) => (
  <IconButton
    centerRipple
    color="default"
    size="small"
    onClick={onClick}
  >
    <FontAwesome name="filter" />
  </IconButton>
);

const FilterFields: FC<FilterFieldsProps> = () => {
  const filterFields = useProperty(ontola.filterFields);

  const menuItems = React.useCallback(({ handleClose }) => filterFields
    .map((field) => (
      <Resource
        handleClose={handleClose}
        key={field?.value}
        subject={field}
      />
    )), [filterFields]);

  return (
    <Menu
      trigger={trigger}
    >
      {menuItems}
    </Menu>
  );
};

FilterFields.type = [
  ontola.SearchResult,
  ontola.Collection,
  as.Collection,
];

FilterFields.topology = allTopologies;

FilterFields.property = ontola.filterFields;

export default register(FilterFields);
