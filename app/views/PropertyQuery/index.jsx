import sh from '@ontologies/shacl';
import {
  Property,
  Resource,
  register,
  subjectType,
} from 'link-redux';
import React from 'react';

import ontola from '../../ontology/ontola';
import { allTopologies } from '../../topologies';

class PropertyQuery extends React.PureComponent {
  static type = ontola.PropertyQuery;

  static topology = allTopologies;

  static mapDataToProps = {
    path: sh.path,
    targetNode: sh.targetNode,
  };

  static propTypes = {
    path: subjectType,
    targetNode: subjectType,
  };

  render() {
    const { path, targetNode } = this.props;

    return (
      <Resource subject={targetNode}>
        <Property label={path} />
      </Resource>
    );
  }
}

export default [
  register(PropertyQuery),
];
