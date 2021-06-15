import rdf, { SomeTerm } from '@ontologies/core';
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
import { invalidStatusIds } from '../Thing/properties/omniform/helpers';

interface ActionDetailProps {
  actionStatus?: SomeTerm;
  name: SomeTerm;
}

const ActionDetail = ({
  actionStatus,
  name,
}: ActionDetailProps): JSX.Element | null => {
  if (actionStatus && invalidStatusIds.includes(rdf.id(actionStatus))) {
    return null;
  }

  return (
    <LDLink>
      <Property
        label={schema.target}
        name={name.value}
      />
    </LDLink>
  );
};

ActionDetail.type = schema.Action;

ActionDetail.topology = [
  cardFloatTopology,
  contentDetailsTopology,
  detailsBarTopology,
];

ActionDetail.mapDataToProps = {
  actionStatus: schema.actionStatus,
  name: schema.name,
};

export default register(ActionDetail);
