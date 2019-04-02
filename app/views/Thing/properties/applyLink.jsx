import { linkedPropType, register } from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { tableRowTopology } from '../../../topologies/TableRow';

class ApplyLink extends React.PureComponent {
  static type = NS.schema('Thing');

  static property = NS.argu('applyLink');

  static topology = tableRowTopology;

  static propTypes = {
    linkedProp: linkedPropType,
  };

  render() {
    const { linkedProp } = this.props;

    return (
      <input readOnly value={linkedProp?.value} />
    );
  }
}

export default register(ApplyLink);
