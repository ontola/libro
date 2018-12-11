import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import Topology from '../Topology';

import './Select.scss';

export const selectTopology = NS.argu('select');

class Select extends Topology {
  constructor(props) {
    super(props);

    this.topology = selectTopology;
    this.ref = React.createRef();
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }

  componentDidMount() {
    this.tryScroll();
  }

  componentDidUpdate() {
    this.tryScroll();
  }

  tryScroll() {
    const { current } = this.ref;
    if (this.props.scrollIntoView && current) {
      current.scrollIntoView();
    }
  }

  render() {
    const {
      children,
      ...props
    } = this.props;

    return this.wrap((
      <ul {...props} ref={this.ref}>
        {children}
      </ul>
    ));
  }
}

export default Select;
