import * as schema from '@ontologies/schema';
import {
  Property,
  register,
  useValues,
} from 'link-redux';
import React from 'react';

import { formFooterTopology } from '../../../Form/topologies';
import argu from '../../ontology/argu';

const PersonFooter = () => {
  const [name] = useValues(schema.name);

  return (
    <Property
      ariaLabel={name}
      label={schema.image}
    />
  );
};

PersonFooter.type = [schema.Person, argu.Page];

PersonFooter.topology = formFooterTopology;

export default register(PersonFooter);
