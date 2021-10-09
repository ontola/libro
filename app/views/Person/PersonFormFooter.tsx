import * as schema from '@ontologies/schema';
import {
  Property,
  register,
  useValues,
} from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import { formFooterTopology } from '../../topologies/FormFooter';

const PersonFooter = () => {
  const [name] = useValues(schema.name);

  return(
    <Property
      ariaLabel={name}
      label={schema.image}
    />
  );
};

PersonFooter.type = [schema.Person, argu.Page];

PersonFooter.topology = [argu.voteBubble, formFooterTopology];

export default register(PersonFooter);
