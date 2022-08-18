import { makeStyles } from '@mui/styles';
import { TopologyFC, createTopologyProvider } from 'link-redux';
import React, { MouseEventHandler, Ref } from 'react';

import { selectTopology } from '../index';

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

const SelectTopology = createTopologyProvider(selectTopology);

const Select: TopologyFC<SelectProps> = ({
  children,
  onMouseDown,
  innerRef,
  role,
}) => (
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

export default Select;
