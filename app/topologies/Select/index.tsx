import { makeStyles } from '@material-ui/styles';
import React, { Ref } from 'react';

import { selectTopology } from '../../topologies';
import Topology from '../Topology';

export const useSelectItemStyles = makeStyles({
  image: {
    display: 'flex',
    marginRight: '.2em',
  },
  selectItem: {
    '& .NavbarLink__image': {
      marginRight: '.1em',
    },
    '& span': {
      maxHeight: '100%',
      overflow: 'hidden',
      textAlign: 'left',
    },
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    padding: '0 2px',
  },
});

interface Props {
  innerRef?: Ref<HTMLDivElement>;
  role?: string;
  scrollIntoView?: any;
}

class Select<P extends Props = Record<string, unknown>> extends Topology<P> {
  constructor(props: P) {
    super(props);

    this.elementType = 'ul';
    this.topology = selectTopology;
  }

  public render() {
    const {
      children,
      scrollIntoView, // eslint-disable-line unused-imports/no-unused-vars
      innerRef,
      ...props
    } = this.props;

    return this.wrap((
      <div
        ref={innerRef}
        role="listbox"
      >
        <ul {...props}>
          {children}
        </ul>
      </div>
    ));
  }
}

export default Select;
