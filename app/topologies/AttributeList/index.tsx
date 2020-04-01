import PropTypes from 'prop-types';
import React from 'react';

import argu from '../../ontology/argu';
import Topology from '../Topology';

import './AttributeList.scss';

export const attributeListTopology = argu.ns('attributeList');

class AttributeList extends Topology {
  public static propTypes = {
    children: PropTypes.node,
  };

  constructor(props: {}) {
    super(props);

    this.className = 'AttributeList';
    this.elementType = 'table';
    this.topology = attributeListTopology;
  }

  public renderContent() {
    return this.wrap((subject) => (
      <table
        className={this.getClassName()}
        resource={subject && subject.value}
        style={this.getStyle()}
      >
        <tbody>
          {this.props.children}
        </tbody>
      </table>
    ));
  }
}

export default AttributeList;
