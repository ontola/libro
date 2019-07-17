import {
  LinkedResourceContainer,
  linkedPropType,
  register,
} from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { containerTopology } from '../../../topologies/Container';

class PublishAction extends React.PureComponent {
  static type = NS.schema('Thing');

  static property = NS.ontola('publishAction');

  static topology = containerTopology;

  static propTypes = {
    linkedProp: linkedPropType,
  };

  render() {
    const { linkedProp } = this.props;

    return <LinkedResourceContainer subject={linkedProp} />;
  }
}

export default register(PublishAction);
