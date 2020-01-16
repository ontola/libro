import schema from '@ontologies/schema';
import { linkedPropType, register } from 'link-redux';
import React from 'react';

import argu from '../../../ontology/argu';
import { tableRowTopology } from '../../../topologies/TableRow';

class ApplyLink extends React.PureComponent {
  static type = schema.Thing;

  static property = argu.ns('applyLink');

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
