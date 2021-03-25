import IconButton from '@material-ui/core/IconButton';
import * as as from '@ontologies/as';
import { NamedNode, SomeTerm } from '@ontologies/core';
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

interface FilterFieldsSearchProps {
  linkedProp: SomeTerm;
  setCurrentPage: (page: NamedNode) => void;
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

const FilterFieldsSearch: FC<FilterFieldsSearchProps> = ({ setCurrentPage }) => {
  const filterFields = useProperty(ontola.filterFields);

  const menuItems = React.useCallback(({ handleClose }) => filterFields
    .map((field) => (
      <Resource
        handleClose={handleClose}
        key={field?.value}
        setCurrentPage={setCurrentPage}
        subject={field}
      />
    )), [filterFields, setCurrentPage]);

  return (
    <Menu
      trigger={trigger}
    >
      {menuItems}
    </Menu>
  );
};

FilterFieldsSearch.type = ontola.SearchResult;

FilterFieldsSearch.topology = allTopologies;

FilterFieldsSearch.property = ontola.filterFields;

const FilterFieldsCollection = () => null;

FilterFieldsCollection.type = [
  ontola.Collection,
  as.Collection,
];

FilterFieldsCollection.topology = allTopologies;

FilterFieldsCollection.property = ontola.filterFields;

export default [
  register(FilterFieldsSearch),
  register(FilterFieldsCollection),
];
