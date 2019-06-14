import { linkType, register } from 'link-redux';
import React from 'react';
import emoji from 'react-easy-emoji';

import { NS } from '../../helpers/LinkedRenderStore';
import { Detail } from '../../components';
import { detailsBarTopology } from '../../topologies/DetailsBar';

const DepartmentDetailsBar = ({ name }) => (
  <Detail text={emoji(`🌍 ${name.value}`)} />
);

DepartmentDetailsBar.type = NS.teamGL('Department');

DepartmentDetailsBar.topology = detailsBarTopology;

DepartmentDetailsBar.mapDataToProps = [NS.schema('name')];

DepartmentDetailsBar.propTypes = {
  name: linkType,
};

export default register(DepartmentDetailsBar);