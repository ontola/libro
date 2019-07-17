import {
  Property,
  linkType,
  register,
} from 'link-redux';
import React from 'react';

import LDLink from '../../components/LDLink';
import { NS } from '../../helpers/LinkedRenderStore';
import { contentDetailsTopology } from '../../topologies/ContentDetails/index';
import { detailsBarTopology } from '../../topologies/DetailsBar/index';

const ActionDetail = ({ name }) => (
  <LDLink>
    <Property
      label={NS.schema('target')}
      name={name.value}
    />
  </LDLink>
);

ActionDetail.type = NS.schema('Action');

ActionDetail.topology = [
  contentDetailsTopology,
  detailsBarTopology,
];

ActionDetail.mapDataToProps = [
  NS.schema('name'),
];

ActionDetail.propTypes = {
  name: linkType,
};

export default register(ActionDetail);
