import * as foaf from '@ontologies/foaf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import { linkedPropType, register } from 'link-redux';
import React from 'react';

import argu from '../../../ontology/argu';
import { parentTopology } from '../../../topologies/Parent';

class ForumNameParent extends React.PureComponent {
  static type = argu.ContainerNode;

  static property = [
    schema.name,
    rdfs.label,
    foaf.name,
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
