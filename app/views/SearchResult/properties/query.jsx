import {
  linkType,
  linkedPropType,
  register,
} from 'link-redux';
import React from 'react';

import argu from '../../../ontology/argu';
import ontola from '../../../ontology/ontola';
import SearchForm from '../../../components/SearchForm';

const Query = ({
  iriTemplate,
  linkedProp,
}) => (
  <SearchForm
    iriTemplate={iriTemplate}
    query={linkedProp}
  />
);

Query.type = ontola.SearchResult;

Query.property = argu.query;

Query.topology = argu.container;

Query.mapDataToProps = {
  iriTemplate: ontola.iriTemplate,
};

Query.propTypes = {
  iriTemplate: linkType,
  linkedProp: linkedPropType,
};


export default register(Query);
