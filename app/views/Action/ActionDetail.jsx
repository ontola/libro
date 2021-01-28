import * as schema from '@ontologies/schema';
import {
  Property,
  linkType,
  register,
} from 'link-redux';
import React from 'react';

import LDLink from '../../components/LDLink';
import { contentDetailsTopology } from '../../topologies/ContentDetails/index';
import { detailsBarTopology } from '../../topologies/DetailsBar';

const ActionDetail = ({ name }) => (
  <LDLink>
    <Property
      label={schema.target}
      name={name.value}
    />
  </LDLink>
);

ActionDetail.type = schema.Action;

ActionDetail.topology = [
  contentDetailsTopology,
  detailsBarTopology,
];

ActionDetail.mapDataToProps = {
  name: schema.name,
};

ActionDetail.propTypes = {
  name: linkType,
};

export default register(ActionDetail);
