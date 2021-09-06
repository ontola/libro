import {
  FC,
  PropertyProps,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import ontola from '../../../ontology/ontola';
import SearchForm from '../../../components/SearchForm';
import { allTopologies } from '../../../topologies';

const Query: FC<PropertyProps> = ({  linkedProp }) => {
  const [placeholder] = useProperty(ontola.placeholder);

  return(
    <SearchForm
      placeholder={placeholder}
      query={linkedProp}
    />
  );
};

Query.type = ontola.SearchResult;

Query.property = ontola.query;

Query.topology = allTopologies;

export default register(Query);
