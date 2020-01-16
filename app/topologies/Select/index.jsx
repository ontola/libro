import React from 'react';

import argu from '../../ontology/argu';
import Topology from '../Topology';

import './Select.scss';

export const selectTopology = argu.ns('select');

class Select extends Topology {
  constructor(props) {
    super(props);

    this.topology = selectTopology;
  }

  render() {
    const {
      children,
      scrollIntoView, // eslint-disable-line no-unused-vars
      ...props
    } = this.props;

    return this.wrap((
      <ul {...props}>
        {children}
      </ul>
    ));
  }
}

export default Select;
