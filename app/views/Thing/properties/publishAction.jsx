import {
  linkedPropType,
  LinkedResourceContainer,
  lrsType,
  register,
} from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { containerTopology } from '../../../topologies/Container';

class PublishAction extends React.PureComponent {
  static type = NS.schema('Thing');

  static property = NS.argu('publishAction');

  static topology = containerTopology;

  static propTypes = {
    linkedProp: linkedPropType,
    lrs: lrsType,
  };

  render() {
    const { linkedProp, lrs } = this.props;

    if (lrs.getResourceProperty(linkedProp, NS.schema('actionStatus')) !== NS.schema('PotentialActionStatus')) {
      return null;
    }

    return <LinkedResourceContainer subject={linkedProp} />;
  }
}

export default register(PublishAction);
