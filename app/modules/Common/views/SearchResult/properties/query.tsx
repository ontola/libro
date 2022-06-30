import {
  FC,
  PropertyProps,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import { allTopologies } from '../../../../../topologies';
import ontola from '../../../../Core/ontology/ontola';
import form from '../../../../Form/ontology/form';
import SearchForm from '../../../components/SearchForm';

const Query: FC<PropertyProps> = ({ linkedProp }) => {
  const [placeholder] = useProperty(form.placeholder);

  return (
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
