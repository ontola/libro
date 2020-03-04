import schema from '@ontologies/schema';
import {
  Property,
  linkType,
  register,
} from 'link-redux';
import React from 'react';

import Button from '../../components/Button';
import { primaryCallToActionTopology } from '../../topologies/PrimaryCallToAction';

const ActionPrimaryCallToAction = ({ name, target }) => (
  <Button
    href={target.value}
    title={name.value}
  >
    <Property label={schema.name} />
  </Button>
);

ActionPrimaryCallToAction.propTypes = {
  name: linkType,
  target: linkType,
};

ActionPrimaryCallToAction.type = schema.Action;

ActionPrimaryCallToAction.topology = primaryCallToActionTopology;

ActionPrimaryCallToAction.mapDataToProps = {
  name: schema.name,
  target: schema.target,
};

export default register(ActionPrimaryCallToAction);
