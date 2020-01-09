import schema from '@ontologies/schema';
import {
  Resource,
  linkedPropType,
  register,
} from 'link-redux';
import React from 'react';

import ontola from '../../../ontology/ontola';
import { containerTopology } from '../../../topologies/Container';

class PublishAction extends React.PureComponent {
  static type = schema.Thing;

  static property = ontola.publishAction;

  static topology = containerTopology;

  static propTypes = {
    linkedProp: linkedPropType,
  };

  render() {
    const { linkedProp } = this.props;

    return <Resource subject={linkedProp} />;
  }
}

export default register(PublishAction);
