import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import Topology from '../Topology';

import './Select.scss';

export const selectTopology = NS.argu('select');

class Select extends Topology {
  constructor(props) {
    super(props);

    this.topology = selectTopology;
  }

  render() {
    const {
      children,
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
