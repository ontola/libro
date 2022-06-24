import { makeStyles } from '@mui/styles';
import React, { MouseEventHandler, Ref } from 'react';
import { useTopologyProvider } from 'link-redux';

import { selectTopology } from '../../topologies';
import { TopologyFC } from '../Topology';

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

export interface SelectProps {
  innerRef?: Ref<HTMLUListElement>;
  role?: string;
  scrollIntoView?: any;
  onMouseDown?: MouseEventHandler;
}

const Select: TopologyFC<SelectProps> = ({
  children,
  onMouseDown,
  innerRef,
  role,
}) => {
  const [SelectTopology] = useTopologyProvider(selectTopology);

  return (
    <SelectTopology>
      <ul
        ref={innerRef}
        role="listbox"
        onMouseDown={onMouseDown}
      >
        <ul role={role}>
          {children}
        </ul>
      </ul>
    </SelectTopology>
  );
};

export default Select;
