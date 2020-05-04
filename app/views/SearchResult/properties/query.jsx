import {
  linkType,
  linkedPropType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import ontola from '../../../ontology/ontola';
import SearchForm from '../../../components/SearchForm';
import { allTopologies } from '../../../topologies';

const Query = ({
  iriTemplate,
  linkedProp,
  placeholder,
  setCurrentPage,
}) => (
  <SearchForm
    iriTemplate={iriTemplate}
    placeholder={placeholder}
    query={linkedProp}
    setCurrentPage={setCurrentPage}
  />
);

Query.type = ontola.SearchResult;

Query.property = ontola.query;

Query.topology = allTopologies;

Query.mapDataToProps = {
  iriTemplate: ontola.iriTemplate,
  placeholder: ontola.placeholder,
};

Query.propTypes = {
  iriTemplate: linkType,
  linkedProp: linkedPropType,
  placeholder: linkType,
  setCurrentPage: PropTypes.func,
};


export default register(Query);
