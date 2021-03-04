import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import argu from '../../ontology/argu';

import './Table.scss';

export const tableTopology = argu.ns('table');

class Table extends TopologyProvider {
  public static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props: Record<string, unknown>) {
    super(props);
    this.topology = tableTopology;
  }

  public render() {
    return this.wrap((
      <div className="Table Table__wrapper">
        <table className="Table Table__table">
          {this.props.children}
        </table>
      </div>
    ));
  }
}

export default Table;
