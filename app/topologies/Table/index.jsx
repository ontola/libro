import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';

import './Table.scss';

export const tableTopology = NS.argu('table');

class Table extends TopologyProvider {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor() {
    super();
    this.topology = tableTopology;
  }

  render() {
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
