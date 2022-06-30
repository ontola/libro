import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import { parentTopology } from '../../../Common/topologies/BreadcrumbsBar';
import { parentProps } from '../../../Core/ontology/app';
import argu from '../../lib/argu';

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
