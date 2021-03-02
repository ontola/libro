import { SomeTerm } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import LDLink from '../../components/LDLink';
import { cardFloatTopology } from '../../topologies/Card/CardFloat';
import { contentDetailsTopology } from '../../topologies/ContentDetails/index';
import { detailsBarTopology } from '../../topologies/DetailsBar';

interface ActionDetailProps {
  name: SomeTerm;
}

const ActionDetail = ({ name }: ActionDetailProps): JSX.Element => (
  <LDLink>
    <Property
      label={schema.target}
      name={name.value}
    />
  </LDLink>
);

ActionDetail.type = schema.Action;

ActionDetail.topology = [
  cardFloatTopology,
  contentDetailsTopology,
  detailsBarTopology,
];

ActionDetail.mapDataToProps = {
  name: schema.name,
};

export default register(ActionDetail);
