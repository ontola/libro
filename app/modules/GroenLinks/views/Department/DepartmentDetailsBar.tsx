import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';
import emoji from 'react-easy-emoji';

import Detail from '../../../Common/components/Detail';
import { retrievePath } from '../../../Common/lib/iris';
import { contentDetailsTopology, detailsBarTopology } from '../../../Common/topologies';
import teamGL from '../../ontology/teamGL';

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
