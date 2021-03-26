import { SomeTerm } from '@ontologies/core';
import {
  FC,
  PropertyProps,
  register,
} from 'link-redux';
import React from 'react';

import ontola from '../../../ontology/ontola';
import SearchForm from '../../../components/SearchForm';
import { allTopologies } from '../../../topologies';

interface QueryProps extends PropertyProps {
  placeholder: SomeTerm;
}

const Query: FC<QueryProps> = ({
  linkedProp,
  placeholder,
}) => (
  <SearchForm
    placeholder={placeholder}
    query={linkedProp}
  />
);

Query.type = ontola.SearchResult;

Query.property = ontola.query;

Query.topology = allTopologies;

Query.mapDataToProps = {
  placeholder: ontola.placeholder,
};

export default register(Query);
