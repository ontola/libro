import {
  Property,
  linkType,
  register,
} from 'link-redux';
import React from 'react';

import { Button } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import { primaryCallToActionTopology } from '../../topologies/PrimaryCallToAction';

const ActionPrimaryCallToAction = ({ name, target }) => (
  <Button
    href={target.value}
    title={name.value}
  >
    <Property label={NS.schema('name')} />
  </Button>
);

ActionPrimaryCallToAction.propTypes = {
  name: linkType,
  target: linkType,
};

ActionPrimaryCallToAction.type = NS.schema('Action');

ActionPrimaryCallToAction.topology = primaryCallToActionTopology;

ActionPrimaryCallToAction.mapDataToProps = [
  NS.schema('name'),
  NS.schema('target'),
];

export default register(ActionPrimaryCallToAction);
