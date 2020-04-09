import {
  linkType,
  linkedPropType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import argu from '../../../ontology/argu';
import ontola from '../../../ontology/ontola';
import SearchForm from '../../../components/SearchForm';
import { allTopologies } from '../../../topologies';

const Query = ({
  iriTemplate,
  linkedProp,
  setCurrentPage,
}) => (
  <SearchForm
    iriTemplate={iriTemplate}
    query={linkedProp}
    setCurrentPage={setCurrentPage}
  />
);

Query.type = ontola.SearchResult;

Query.property = argu.query;

Query.topology = allTopologies;

Query.mapDataToProps = {
  iriTemplate: ontola.iriTemplate,
};

Query.propTypes = {
  iriTemplate: linkType,
  linkedProp: linkedPropType,
  setCurrentPage: PropTypes.func,
};


export default register(Query);
