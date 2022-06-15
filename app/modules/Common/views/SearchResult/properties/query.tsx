import {
  FC,
  PropertyProps,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import form from '../../../../Form/ontology/form';
import ontola from '../../../../../ontology/ontola';
import { allTopologies } from '../../../../../topologies';
import SearchForm from '../../../components/SearchForm';

const Query: FC<PropertyProps> = ({  linkedProp }) => {
  const [placeholder] = useProperty(form.placeholder);

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
