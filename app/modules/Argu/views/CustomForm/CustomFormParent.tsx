import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import { parentProps } from '../../../../ontology/app';
import argu from '../../ontology/argu';
import { parentTopology } from '../../../../topologies';

interface CustomFormParent {
  first?: boolean;
}

const CustomFormParent: FC<CustomFormParent> = ({
  first,
}) => (
  <Property
    first={first}
    label={parentProps}
  />
);

CustomFormParent.type = argu.CustomForm;

CustomFormParent.topology = parentTopology;

export default register(CustomFormParent);
