import {
  FC,
  PropertyProps,
  register,
} from 'link-redux';
import React from 'react';

import Link from '../../../../components/Link';
import teamGL from '../../../../ontology/teamGL';
import { allTopologies } from '../../../../topologies';
import { postalCodeIri } from '../../Glapp/helpers';

const PostalDigits: FC<PropertyProps> = ({ linkedProp }) => (
  <span>
    <Link to={postalCodeIri(linkedProp.value).value}>
      {linkedProp.value}
    </Link>
  </span>
);

PostalDigits.type = teamGL.Street;

PostalDigits.topology = allTopologies;

PostalDigits.property = teamGL.postalDigits;

export default register(PostalDigits);
