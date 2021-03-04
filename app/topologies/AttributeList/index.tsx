import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

import argu from '../../ontology/argu';
import Topology, { TopologyContent } from '../Topology';

import './AttributeList.scss';

export const attributeListTopology = argu.ns('attributeList');

class AttributeList extends Topology {
  public static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    fullLabel: PropTypes.bool,
  };

  public static defaultProps = {
    fullLabel: true,
  };

  constructor(props: Record<string, unknown>) {
    super(props);

    this.elementType = 'table';
    this.topology = attributeListTopology;
  }

  public getClassName(): string {
    return clsx({
      'AttributeList': true,
      'AttributeList--full-label': (this.props as any).fullLabel,
    });
  }

  public renderContent(): TopologyContent {
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
