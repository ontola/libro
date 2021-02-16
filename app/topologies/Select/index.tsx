import React, { Ref } from 'react';

import argu from '../../ontology/argu';
import Topology from '../Topology';

import './Select.scss';

export const selectTopology = argu.ns('select');

interface Props {
  innerRef?: Ref<HTMLDivElement>;
  role?: string;
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
      innerRef,
      ...props
    } = this.props;

    return this.wrap((
      <div ref={innerRef} role="listbox">
        <ul {...props}>
          {children}
        </ul>
      </div>
    ));
  }
}

export default Select;
