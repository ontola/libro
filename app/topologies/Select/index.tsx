import { makeStyles } from '@mui/styles';
import React, { Ref } from 'react';
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
  innerRef?: Ref<HTMLDivElement>;
  role?: string;
  scrollIntoView?: any;
}

const Select: TopologyFC<SelectProps> = ({ children, innerRef, role }) => {
  const [SelectTopology] = useTopologyProvider(selectTopology);

  return (
    <SelectTopology>
      <div
        ref={innerRef}
        role="listbox"
      >
        <ul role={role}>
          {children}
        </ul>
      </div>
    </SelectTopology>
  );
};

export default Select;
