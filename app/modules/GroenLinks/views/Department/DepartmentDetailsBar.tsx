import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';
import emoji from 'react-easy-emoji';

import Detail from '../../../../components/Detail';
import teamGL from '../../../../ontology/teamGL';
import { contentDetailsTopology, detailsBarTopology } from '../../../../topologies';
import { retrievePath } from '../../../../helpers/iris';

const DepartmentDetailsBar: FC = ({ subject }) => {
  const [name] = useProperty(schema.name);
  const [url] = useProperty(schema.url);

  return (
    <Detail
      text={emoji(`🌍 ${name.value}`)}
      url={url?.value ?? retrievePath(subject.value)}
    />
  );
};

DepartmentDetailsBar.type = teamGL.Department;

DepartmentDetailsBar.topology = [
  detailsBarTopology,
  contentDetailsTopology,
];

export default register(DepartmentDetailsBar);
