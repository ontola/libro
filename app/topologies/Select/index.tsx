import React from 'react';

import argu from '../../ontology/argu';
import Topology from '../Topology';

import './Select.scss';

export const selectTopology = argu.ns('select');

interface Props {
  elementType?: string;
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
      elementType: ElementType = 'ul',
      ...props
    } = this.props;

    return this.wrap((
      // @ts-ignore
      <ElementType {...props}>
        {children}
      </ElementType>
    ));
  }
}

export default Select;
