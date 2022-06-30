import * as schema from '@ontologies/schema';
import {
  Resource,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import ontola from '../../../../Core/ontology/ontola';
import { containerTopology } from '../../../topologies/Container';

const PublishAction = () => {
  const [datePublished] = useProperty(schema.datePublished);
  const [linkedProp] = useProperty(ontola.publishAction);

  if (datePublished) {
    return null;
  }

  return <Resource subject={linkedProp} />;
};

PublishAction.type = schema.Thing;

PublishAction.property = ontola.publishAction;

PublishAction.topology = containerTopology;

export default register(PublishAction);
