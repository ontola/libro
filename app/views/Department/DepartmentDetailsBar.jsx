import schema from '@ontologies/schema';
import {
  linkType,
  register,
  subjectType,
} from 'link-redux';
import React from 'react';
import emoji from 'react-easy-emoji';

import Detail from '../../components/Detail';
import teamGL from '../../ontology/teamGL';
import { detailsBarTopology } from '../../topologies/DetailsBar';
import { contentDetailsTopology } from '../../topologies/ContentDetails';
import { retrievePath } from '../../helpers/iris';

const DepartmentDetailsBar = ({ name, subject }) => (
  <Detail
    text={emoji(`🌍 ${name.value}`)}
    url={retrievePath(subject.value)}
  />
);

DepartmentDetailsBar.type = teamGL.Department;

DepartmentDetailsBar.topology = [
  detailsBarTopology,
  contentDetailsTopology,
];

DepartmentDetailsBar.mapDataToProps = {
  name: schema.name,
};

DepartmentDetailsBar.propTypes = {
  name: linkType,
  subject: subjectType,
};

export default register(DepartmentDetailsBar);
