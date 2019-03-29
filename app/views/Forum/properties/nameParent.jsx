import { linkedPropType, register } from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { parentTopology } from '../../../topologies/Parent';

class ForumNameParent extends React.PureComponent {
  static type = [NS.argu('ContainerNode')];

  static property = [
    NS.schema('name'),
    NS.rdfs('label'),
    NS.foaf('name'),
  ];

  static topology = parentTopology;

  static propTypes = {
    linkedProp: linkedPropType,
  };

  render() {
    const { linkedProp } = this.props;

    return (
      <span
        style={{
          color: 'var(--accent-background-color)',
          fontWeight: 'bold',
        }}
      >
        {linkedProp.value}
      </span>
    );
  }
}

export default register(ForumNameParent);
