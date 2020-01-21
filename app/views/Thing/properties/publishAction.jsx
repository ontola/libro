import schema from '@ontologies/schema';
import {
  Resource,
  linkedPropType,
  register,
} from 'link-redux';
import React from 'react';

import ontola from '../../../ontology/ontola';
import { containerTopology } from '../../../topologies/Container';

const PublishAction = ({
  datePublished,
  linkedProp,
}) => {
  if (datePublished) {
    return null;
  }

  return <Resource subject={linkedProp} />;
};

PublishAction.type = schema.Thing;

PublishAction.property = ontola.publishAction;

PublishAction.topology = containerTopology;

PublishAction.mapDataToProps = {
  datePublished: schema.datePublished,
  linkedProp: ontola.publishAction,
};

PublishAction.propTypes = {
  datePublished: linkedPropType,
  linkedProp: linkedPropType,
};

export default register(PublishAction);
