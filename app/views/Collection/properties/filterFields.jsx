import IconButton from '@material-ui/core/IconButton';
import * as as from '@ontologies/as';
import {
  Resource,
  register,
  useProperty,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import ontola from '../../../ontology/ontola';
import { allTopologies } from '../../../topologies';
import Menu from '../../../topologies/Menu';

const FilterFieldsSearch = ({ setCurrentPage }) => {
  const filterFields = useProperty(ontola.filterFields);

  const trigger = (onClick) => (
    <IconButton
      centerRipple
      color="default"
      size="small"
      onClick={onClick}
    >
      <FontAwesome name="filter" />
    </IconButton>
  );

  const menuItems = ({ handleClose }) => filterFields
    .map((field) => (
      <Resource
        handleClose={handleClose}
        setCurrentPage={setCurrentPage}
        subject={field}
      />
    ));

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

FilterFieldsSearch.propTypes = {
  setCurrentPage: PropTypes.func,
};


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
