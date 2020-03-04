import React from 'react';

import argu from '../../ontology/argu';
import Topology from '../Topology';

import './Select.scss';

export const selectTopology = argu.ns('select');

interface Props {
  scrollIntoView?: any;
}

class Select<P extends Props = {}> extends Topology<P> {
  constructor(props: P) {
    super(props);

    this.topology = selectTopology;
  }

  public render() {
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
